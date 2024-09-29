import { Extension, ReactRenderer } from "@tiptap/react"
import { Editor } from "@tiptap/core"
import type { SuggestionOptions } from "@tiptap/suggestion"
import { Suggestion } from "@tiptap/suggestion"
import { PluginKey } from "prosemirror-state"
import type { GetReferenceClientRect, Instance, Placement } from "tippy.js"
import { countMaxEntry } from "./search"
import { SpotlightList } from "./spotlight-list"
import tippy, { type Props } from "tippy.js"
import { SpotlightItem, SpotlightManager } from "./model"
import { baseSpotlightManager } from "./items"

export const SpotlightPluginKey = new PluginKey("spotlight")

export type SpotlightOptions = {
  suggestion: Omit<
    SuggestionOptions<any, SpotlightItem> & { manager: SpotlightManager },
    "editor"
  >
}

type SpotlightSuggestionOptions = {
  manager?: SpotlightManager
  tippyProps?: Partial<Props>
  shouldShow?: (editor: Editor) => boolean
}

export const generateSuggestionOptions = ({
  manager = baseSpotlightManager,
  tippyProps: tippyPropsOverride,
  shouldShow = () => true,
}: SpotlightSuggestionOptions = {}): SpotlightOptions["suggestion"] => {
  return {
    manager,
    char: "/",
    allowSpaces: true,
    pluginKey: SpotlightPluginKey,
    items: ({ query, editor }) => {
      const sel = editor.state.selection

      query = query.toLowerCase()

      if (query.length > 20) return []
      if (!sel.empty) return []

      const nodeAfter = sel.$head.nodeAfter

      if (nodeAfter !== null && (nodeAfter.text || "")[0] !== " ") return []

      const visibleSpotlightItems = baseSpotlightManager
        .getAllItems()
        .filter((item) =>
          item.get("visible") ? item.get("visible")?.(editor) : true
        )

      let maxMatchCount = 0
      const matchMap: Record<string, number> = {}

      for (const item of visibleSpotlightItems) {
        let matchCount = 0

        for (const keyword of item.get("search").keywords) {
          if (query === "") break

          matchCount += Math.max(
            countMaxEntry(query, keyword)
            // countMaxEntry(toSecondLanguage(query), keyword)
          )
        }

        matchMap[item.get("name")] = matchCount

        if (matchCount > maxMatchCount) maxMatchCount = matchCount
      }

      return visibleSpotlightItems.filter((item) => {
        return matchMap[item.get("name")] === maxMatchCount
      })
    },
    render: () => {
      let component: ReactRenderer
      let popup: Instance

      const tippyProps = Object.assign(
        {
          appendTo: () => document.body,
          showOnCreate: true,
          interactive: true,
          trigger: "manual",
          placement: "bottom-start" as Placement,
        },
        tippyPropsOverride
      )

      return {
        onStart: (props) => {
          component = new ReactRenderer(SpotlightList, {
            props: { ...props, editor: props.editor, manager },
            editor: props.editor,
          })

          const editor = props.editor

          if (!shouldShow(editor)) return

          if (!props.clientRect) {
            return
          }

          popup = tippy(props.editor.options.element as HTMLElement, {
            getReferenceClientRect: props.clientRect as GetReferenceClientRect,
            content: component.element,
            ...tippyProps,
          })

          console.log(popup)
        },

        onUpdate(props) {
          component.updateProps({ ...props, manager })

          if (!props.clientRect) {
            return
          }

          popup.setContent(component.element)
        },

        onKeyDown(props) {
          if (props.event.key === "Escape") {
            popup.hide()
          }

          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          return component?.ref?.onKeyDown(props)
        },

        onExit() {
          if (popup) {
            popup.destroy()
          }

          if (component) {
            component.destroy()
          }
        },
      }
    },
    command: ({ editor, range, props: item }) => {
      const { nodeAfter } = editor.view.state.selection.$to
      const overrideSpace =
        nodeAfter?.text?.startsWith(" ") && item._group === "block"

      if (overrideSpace) {
        range.to += 1
      }

      editor.commands.deleteRange(range)

      if (item._group === "block") {
        const end = editor.state.doc.resolve(editor.state.selection.from).end()

        editor.commands.insertContentAt(end, [{ type: "paragraph" }])
      }

      item.get("command")(editor)

      window.getSelection()?.collapseToEnd()
    },
  }
}

export const Spotlight = Extension.create<SpotlightOptions>({
  name: "spotlight",

  addOptions() {
    return {
      suggestion: generateSuggestionOptions(),
    }
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
      }),
    ]
  },
})
