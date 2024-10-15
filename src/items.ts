import React from "react"
// import { PaletteItemMarker } from "../components/palette/palette-item-marker";
// import { shortcutTextMap } from "../../components/common/shortcuts";
// import { palette } from "../../core/palette";
import { BoldIcon } from "./icons/bold-icon"
import { BulletListIcon } from "./icons/bullet-list-icon"
import { ClearFormatIcon } from "./icons/clear-format-icon"
import { CodeBlockIcon } from "./icons/code-block-icon"
import { CodeIcon } from "./icons/code-icon"
import { DeleteIcon } from "./icons/delete-icon"
import { Heading1Icon } from "./icons/heading1-icon"
import { Heading2Icon } from "./icons/heading2-icon"
import { Heading3Icon } from "./icons/heading3-icon"
import { Heading4Icon } from "./icons/heading4-icon"
import { Heading5Icon } from "./icons/heading5-icon"
import { ItalicIcon } from "./icons/italic-icon"
import { OrderedListIcon } from "./icons/ordered-list-icon"
import { StrikeIcon } from "./icons/strike-icon"
import { TableIcon } from "./icons/table-icon"
import { TextAlignCenterIcon } from "./icons/text-align-center-icon"
import { TextAlignLeftIcon } from "./icons/text-align-left-icon"
import { TextAlignRightIcon } from "./icons/text-align-right-icon"
import { TextIcon } from "./icons/text-icon"
import { UnderlineIcon } from "./icons/underline-icon"
import { LinkIcon } from "./icons/link-icon"
import { checkCommandExistence } from "./utils"
import { SpotlightItem, SpotlightManager, SpotlightSection } from "./model"

const baseHeadingKeywords = ["heading"]
const turnIntoKeywords = ["turn", "into"]

export const SpotlightHeading1 = new SpotlightItem({
  name: "heading1",
  icon: Heading1Icon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "heading", attrs: { level: 1 } }])
      .run(),
  label: "Heading 1",
  search: {
    keywords: [...baseHeadingKeywords, "1"],
  },
})

export const SpotlightHeading2 = new SpotlightItem({
  name: "heading2",
  icon: Heading2Icon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "heading", attrs: { level: 2 } }])
      .run(),
  label: "Heading 2",
  search: {
    keywords: [...baseHeadingKeywords, "2"],
  },
})

export const SpotlightHeading3 = new SpotlightItem({
  name: "heading3",
  icon: Heading3Icon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "heading", attrs: { level: 3 } }])
      .run(),
  label: "Heading 3",
  search: {
    keywords: [...baseHeadingKeywords, "3"],
  },
})

export const SpotlightHeading4 = new SpotlightItem({
  name: "heading4",
  icon: Heading4Icon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "heading", attrs: { level: 4 } }])
      .run(),
  label: "Heading 4",
  search: {
    keywords: [...baseHeadingKeywords, "4"],
  },
})

export const SpotlightHeading5 = new SpotlightItem({
  name: "heading5",
  icon: Heading5Icon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "heading", attrs: { level: 5 } }])
      .run(),
  label: "Heading 5",
  search: {
    keywords: [...baseHeadingKeywords, "5"],
  },
})

export const SpotlightText = new SpotlightItem({
  name: "text",
  icon: TextIcon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "paragraph" }])
      .run(),
  label: "Text",
  search: {
    keywords: ["text", "paragraph"],
  },
})

export const SpotlightBulletList = new SpotlightItem({
  name: "bulletList",
  icon: BulletListIcon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "bulletList",
          content: [{ type: "listItem", content: [{ type: "paragraph" }] }],
        },
      ])
      .run(),
  label: "Bullet list",
  search: {
    keywords: ["list", "bullet"],
  },
})

export const SpotlightOrderedList = new SpotlightItem({
  name: "orderedList",
  icon: OrderedListIcon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([
        {
          type: "orderedList",
          content: [{ type: "listItem", content: [{ type: "paragraph" }] }],
        },
      ])
      .run(),
  label: "Ordered list",
  search: {
    keywords: ["list", "ordered"],
  },
})

export const SpotlightCodeBlock = new SpotlightItem({
  name: "codeBlock",
  icon: CodeBlockIcon,
  command: (editor) =>
    editor
      .chain()
      .focus()
      .insertContent([{ type: "codeBlock" }])
      .run(),
  label: "Code block",
  search: {
    keywords: ["code", "block"],
  },
})

export const SpotlightTable = new SpotlightItem({
  name: "table",
  icon: TableIcon,
  command: (editor) => editor.chain().focus().insertTable().run(),
  label: "Table",
  search: {
    keywords: ["table"],
  },
})

export const SpotlightLink = new SpotlightItem({
  name: "link",
  icon: LinkIcon,
  command: (editor) => editor.chain().focus().setLink({ href: "" }).run(),
  label: "Ссылка",
  search: {
    keywords: ["ссылка", "link", "anchor", "inline"],
  },
})

export const SpotlightCode = new SpotlightItem({
  name: "code",
  icon: CodeIcon,
  command: (editor) => editor.chain().focus().setCode().run(),
  label: "Code",
  search: {
    keywords: ["inline", "code"],
  },
})

export const SpotlightTurnText = new SpotlightItem({
  name: "turnText",
  icon: TextIcon,
  active: (editor) => editor.isActive("paragraph"),
  command: (editor) => editor.chain().focus().setNode("paragraph").run(),
  label: "Text",
  search: {
    keywords: ["text", "paragraph", ...turnIntoKeywords],
  },
})

export const SpotlightTurnHeading1 = new SpotlightItem({
  name: "turnHeading1",
  icon: Heading1Icon,
  active: (editor) => editor.isActive("heading", { level: 1 }),
  command: (editor) => editor.chain().focus().toggleHeading({ level: 1 }).run(),
  label: "Heading 1",
  search: {
    keywords: [...baseHeadingKeywords, "1", ...turnIntoKeywords],
  },
})

export const SpotlightTurnHeading2 = new SpotlightItem({
  name: "turnHeading2",
  icon: Heading2Icon,
  active: (editor) => editor.isActive("heading", { level: 2 }),
  command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
  label: "Heading 2",
  search: {
    keywords: [...baseHeadingKeywords, "2", ...turnIntoKeywords],
  },
})

export const SpotlightTurnHeading3 = new SpotlightItem({
  name: "turnHeading3",
  icon: Heading3Icon,
  active: (editor) => editor.isActive("heading", { level: 3 }),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleHeading")) return true

    return editor.chain().focus().toggleHeading({ level: 3 }).run()
  },
  label: "Heading 3",
  search: {
    keywords: [...baseHeadingKeywords, "3", ...turnIntoKeywords],
  },
})

export const SpotlightTurnHeading4 = new SpotlightItem({
  name: "turnHeading4",
  icon: Heading4Icon,
  active: (editor) => editor.isActive("heading", { level: 4 }),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleHeading")) return true

    return editor.chain().focus().toggleHeading({ level: 4 }).run()
  },

  label: "Heading 4",
  search: {
    keywords: [...baseHeadingKeywords, "4", ...turnIntoKeywords],
  },
})

export const SpotlightTurnHeading5 = new SpotlightItem({
  name: "turnHeading5",
  icon: Heading5Icon,
  active: (editor) => editor.isActive("heading", { level: 5 }),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleHeading")) return true

    return editor.chain().focus().toggleHeading({ level: 5 }).run()
  },
  label: "Heading 5",
  search: {
    keywords: [...baseHeadingKeywords, "5", ...turnIntoKeywords],
  },
})

export const SpotlightTurnBulletList = new SpotlightItem({
  name: "turnBulletList",
  icon: BulletListIcon,
  active: (editor) => editor.isActive("bulletList"),
  command: (editor) => editor.chain().focus().toggleBulletList().run(),
  label: "Bullet list",
  search: {
    keywords: ["list", "bullet", ...turnIntoKeywords],
  },
})

export const SpotlightTurnOrderedList = new SpotlightItem({
  name: "turnOrderedList",
  icon: OrderedListIcon,
  active: (editor) => editor.isActive("orderedList"),
  command: (editor) => editor.chain().focus().toggleOrderedList().run(),
  label: "Ordered list",
  search: {
    keywords: ["list", "ordered", ...turnIntoKeywords],
  },
})

export const SpotlightAlignLeft = new SpotlightItem({
  name: "alignLeft",
  icon: TextAlignLeftIcon,
  active: (editor) => {
    const $pos = editor.state.doc.resolve(editor.state.selection.from)
    const node = $pos.parent

    return node.attrs.textAlign === "left"
  },
  command: (editor) => {
    if (!checkCommandExistence(editor, "setTextAlign")) return true

    return editor.chain().focus().setTextAlign("left").run()
  },
  label: "Left",
  search: {
    keywords: ["align", "left"],
  },
})

export const SpotlightAlignCenter = new SpotlightItem({
  name: "alignCenter",
  icon: TextAlignCenterIcon,
  active: (editor) => {
    const $pos = editor.state.doc.resolve(editor.state.selection.from)
    const node = $pos.parent

    return node.attrs.textAlign === "center"
  },
  command: (editor) => {
    if (!checkCommandExistence(editor, "setTextAlign")) return true

    return editor.chain().focus().setTextAlign("center").run()
  },
  label: "Center",
  search: {
    keywords: ["align", "center"],
  },
})

export const SpotlightAlignRight = new SpotlightItem({
  name: "alignRight",
  icon: TextAlignRightIcon,
  active: (editor) => {
    const $pos = editor.state.doc.resolve(editor.state.selection.from)
    const node = $pos.parent

    return node.attrs.textAlign === "right"
  },
  command: (editor) => {
    if (!checkCommandExistence(editor, "setTextAlign")) return true

    return editor.chain().focus().setTextAlign("right").run()
  },
  label: "Right",
  search: {
    keywords: ["align", "right"],
  },
})

export const SpotlightBold = new SpotlightItem({
  name: "bold",
  icon: BoldIcon,
  active: (editor) => editor.isActive("bold"),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleBold")) return true

    return editor.chain().focus().toggleBold().run()
  },
  label: "Bold",
  search: {
    keywords: ["bold"],
  },
})

export const SpotlightItalic = new SpotlightItem({
  name: "italic",
  icon: ItalicIcon,
  active: (editor) => editor.isActive("italic"),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleItalic")) return true

    return editor.chain().focus().toggleItalic().run()
  },
  label: "Italic",
  search: {
    keywords: ["italic"],
  },
})

export const SpotlightStrike = new SpotlightItem({
  name: "strike",
  icon: StrikeIcon,
  active: (editor) => editor.isActive("strike"),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleStrike")) return true

    return editor.chain().focus().toggleStrike().run()
  },
  label: "Strike",
  search: {
    keywords: ["strike"],
  },
})

export const SpotlightUnderline = new SpotlightItem({
  name: "underline",
  icon: UnderlineIcon,
  active: (editor) => editor.isActive("underline"),
  command: (editor) => {
    if (!checkCommandExistence(editor, "toggleUnderline")) return true

    return editor.chain().focus().toggleUnderline().run()
  },
  label: "Underline",
  search: {
    keywords: ["underline"],
  },
})

export const SpotlightClear = new SpotlightItem({
  name: "clear",
  icon: ClearFormatIcon,
  command: (editor) => {
    if (!checkCommandExistence(editor, "unsetBold")) return true
    if (!checkCommandExistence(editor, "unsetItalic")) return true
    if (!checkCommandExistence(editor, "unsetStrike")) return true
    if (!checkCommandExistence(editor, "unsetUnderline")) return true

    return editor
      .chain()
      .focus()
      .unsetBold()
      .unsetItalic()
      .unsetStrike()
      .unsetUnderline()
      .run()
  },
  label: "Clear",
  search: {
    keywords: ["clear"],
  },
})

// {
// 	name: "black",
// 	icon: () => <PaletteItemMarker item={palette.black} />,
// 	active: (editor) => {
// 		return (
// 			editor.isActive("textStyle", { color: palette.black.color }) ||
// 			!editor.isActive("textStyle")
// 		);
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.black.color })
// 			.run(),
// 	label: "Основной",
// 	search: {
// 		keywords: ["color", "black", "черный", "main", "основной"]
// 	},
// },
// {
// 	name: "grey",
// 	icon: () => <PaletteItemMarker item={palette.grey} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.grey.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.grey.color })
// 			.run(),
// 	label: "Серый",
// 	search: {
// 		keywords: ["color", "grey", "серый"]
// 	},
// },
// {
// 	name: "white",
// 	icon: () => <PaletteItemMarker item={palette.white} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.white.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.white.color })
// 			.run(),
// 	label: "Белый",
// 	search: {
// 		keywords: ["color", "white", "белый"]
// 	},
// },
// {
// 	name: "blue",
// 	icon: () => <PaletteItemMarker item={palette.blue} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.blue.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.blue.color })
// 			.run(),
// 	label: "Синий",
// 	search: {
// 		keywords: ["color", "blue", "синий"]
// 	},
// },
// {
// 	name: "green",
// 	icon: () => <PaletteItemMarker item={palette.green} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.green.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.green.color })
// 			.run(),
// 	label: "Зеленый",
// 	search: {
// 		keywords: ["color", "green", "зеленый"]
// 	},
// },
// {
// 	name: "orange",
// 	icon: () => <PaletteItemMarker item={palette.orange} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.orange.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.orange.color })
// 			.run(),
// 	label: "Оранжевый",
// 	search: {
// 		keywords: ["color", "orange", "оранжевый"]
// 	},
// },
// {
// 	name: "red",
// 	icon: () => <PaletteItemMarker item={palette.red} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.red.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.red.color })
// 			.run(),
// 	label: "Красный",
// 	search: {
// 		keywords: ["color", "red", "красный"]
// 	},
// },
// {
// 	name: "purple",
// 	icon: () => <PaletteItemMarker item={palette.purple} />,
// 	active: (editor) => {
// 		return editor.isActive("textStyle", { color: palette.purple.color });
// 	},
// 	command: (editor) =>
// 		editor
// 			.chain()
// 			.focus()
// 			.toggleMark("textStyle", { color: palette.purple.color })
// 			.run(),
// 	label: "Фиолетовый",
// 	search: {
// 		keywords: ["color", "purple", "фиолетовый"]
// 	},
// },

export const SpotlightDelete = new SpotlightItem({
  name: "delete",
  icon: DeleteIcon,
  command: (editor) => {
    const sel = editor.state.selection

    if (!sel.empty) return true

    const $pos = editor.state.doc.resolve(sel.head)

    let from
    let to
    const parentNode = $pos.node($pos.depth - 1)

    if (parentNode.type.name !== "doc" && parentNode.childCount === 1) {
      from = $pos.before($pos.depth - 1)
      to = $pos.after($pos.depth - 1)
    } else {
      from = $pos.before($pos.depth)
      to = $pos.after($pos.depth)
    }

    return editor.chain().focus().deleteRange({ from, to }).run()
  },
  label: "Delete",
  search: {
    keywords: ["delete"],
  },
})

export const SpotlightBlockSection = new SpotlightSection(
  { name: "block", label: "blocks" },
  [
    SpotlightHeading1,
    SpotlightHeading2,
    SpotlightHeading3,
    SpotlightHeading4,
    SpotlightHeading5,
    SpotlightText,
    SpotlightBulletList,
    SpotlightOrderedList,
    SpotlightCodeBlock,
    SpotlightTable,
  ]
)

export const SpotlightTurnSection = new SpotlightSection(
  { name: "turn", label: "turn into" },
  [
    SpotlightTurnHeading1,
    SpotlightTurnHeading2,
    SpotlightTurnHeading3,
    SpotlightTurnHeading4,
    SpotlightTurnHeading5,
    SpotlightTurnText,
    SpotlightTurnBulletList,
    SpotlightTurnOrderedList,
  ]
)

export const SpotlightTextSection = new SpotlightSection(
  { name: "text", label: "text" },
  [
    SpotlightBold,
    SpotlightItalic,
    SpotlightStrike,
    SpotlightUnderline,
    SpotlightClear,
  ]
)

export const SpotlightAlignSection = new SpotlightSection(
  { name: "align", label: "align" },
  [SpotlightAlignLeft, SpotlightAlignCenter, SpotlightAlignRight]
)

export const SpotlightActionSection = new SpotlightSection(
  { name: "action", label: "actions" },
  [SpotlightDelete]
)

export const baseSpotlightManager = new SpotlightManager([
  SpotlightBlockSection,
  SpotlightTurnSection,
  SpotlightTextSection,
  SpotlightAlignSection,
  SpotlightActionSection,
])
