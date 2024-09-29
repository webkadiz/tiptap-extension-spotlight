import React, {
  Fragment,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react"
import type { Editor } from "@tiptap/core"
import { Styled } from "./styles"
// import { ShortcutLabel } from "../../components/common/shortcuts";
import { CheckIcon } from "./icons/check-icon"
import { SpotlightItem, SpotlightManager } from "./model"

interface Props {
  editor: Editor
  items: SpotlightItem[]
  command: (item: SpotlightItem) => void
  manager: SpotlightManager
}

enum Key {
  ARROW_UP = "ArrowUp",
  ARROW_DOWN = "ArrowDown",
  ENTER = "Enter",
  ESCAPE = "Escape",
}

export const SpotlightList = forwardRef((props: Props, reference) => {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    const element = document.querySelector(".spotlight-item.is-selected")

    if (element) {
      // keep element into viewport
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      element.scrollIntoViewIfNeeded(false)
    }
  }, [selectedIndex])

  const selectItem = (index: number) => {
    const item = props.items[index]

    if (item) {
      props.command(item)
    }
  }

  const keyToHandler: Record<Key, () => void> = {
    [Key.ARROW_UP]: () => {
      setSelectedIndex(
        (selectedIndex + props.items.length - 1) % props.items.length
      )
    },
    [Key.ARROW_DOWN]: () => {
      setSelectedIndex((selectedIndex + 1) % props.items.length)
    },
    [Key.ENTER]: () => {
      selectItem(selectedIndex)
    },
    [Key.ESCAPE]: () => {
      //
    },
  }

  useEffect(() => setSelectedIndex(0), [props.items])

  useImperativeHandle(reference, () => ({
    onKeyDown: ({ event }: { event: KeyboardEvent }) => {
      if (Object.keys(keyToHandler).includes(event.key)) {
        keyToHandler[event.key as Key]()

        return true
      }

      return false
    },
  }))

  if (props.items.length === 0) {
    return null
  }

  props.manager.prepareFilterable(props.items)

  return (
    <Styled.SpotlightListContainer className={"spotlight-list"}>
      {props.manager.getFilterableSections().map((section) => (
        <Fragment key={section.get("name")}>
          <Styled.SpotlightDivider>
            <Styled.SpotlightDividerLine />
            <Styled.SpotlightDividerText>
              {section.get("label")}
            </Styled.SpotlightDividerText>
          </Styled.SpotlightDivider>
          {section.getFilteredItems().map((item) => (
            <Styled.SpotlightListItem
              className={`spotlight-item ${
                props.manager.getIndexFor(item) === selectedIndex
                  ? "is-selected"
                  : ""
              }`}
              onClick={() => selectItem(props.manager.getIndexFor(item))}
              key={item.get("name")}
            >
              <Styled.SpotlightListItemLeft>
                {item.get("icon") && item.get("icon")?.({})}
                {item.get("label")}
              </Styled.SpotlightListItemLeft>
              <Styled.SpotlightListItemRight>
                {/* {item.shortcut && <ShortcutLabel shortcut={item.shortcut} />} */}
                {item.get("active")?.(props.editor) && <CheckIcon />}
              </Styled.SpotlightListItemRight>
            </Styled.SpotlightListItem>
          ))}
        </Fragment>
      ))}
    </Styled.SpotlightListContainer>
  )
})
