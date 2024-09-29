import type { Editor } from "@tiptap/core"

export const checkCommandExistence = (
  editor: Editor,
  commandName: string
): boolean => {
  if (commandName in editor.commands) {
    return true
  } else {
    console.warn(
      "[spotlight warn]",
      new TypeError(`command "${commandName}" not found`)
    )
    return false
  }
}
