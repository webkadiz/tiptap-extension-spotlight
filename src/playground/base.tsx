import ReactDOM from "react-dom/client"
import React from "react"
import type { FC } from "react"
import { EditorContent, useEditor } from "@tiptap/react"
import Document from "@tiptap/extension-document"
import Text from "@tiptap/extension-text"
import Paragraph from "@tiptap/extension-paragraph"
import { Spotlight } from "../extension"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Underline from "@tiptap/extension-underline"
import Strike from "@tiptap/extension-strike"
import Table from "@tiptap/extension-table"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import CodeBlock from "@tiptap/extension-code-block"
import Heading from "@tiptap/extension-heading"
import Code from "@tiptap/extension-code"
import TextAlign from "@tiptap/extension-text-align"
import Link from "@tiptap/extension-link"
import styled, { createGlobalStyle } from "styled-components"

const App: FC = () => {
  const editor = useEditor({
    content: "",
    autofocus: true,
    extensions: [
      Document.extend({
        addKeyboardShortcuts() {
          return {
            "alt-c": ({ editor }) => {
              if (editor.isActive("table")) return editor.commands.deleteTable()

              return true
            },
          }
        },
      }),
      Text,
      Paragraph,
      Bold,
      Italic,
      Underline,
      Strike,
      Table.configure({
        resizable: true,
      }),
      TableHeader,
      TableRow,
      TableCell,
      BulletList,
      OrderedList,
      ListItem,
      CodeBlock,
      Heading,
      Code,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Link,
      Spotlight,
    ],
  })

  return (
    <Container>
      <EditorContent editor={editor} />
      <GlobalStyles />
    </Container>
  )
}

const GlobalStyles = createGlobalStyle`
  html {
    overflow: hidden;
  }

`

const Container = styled.div`
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0px 12px 33px 0px rgba(0, 0, 0, 0.06),
    0px 3.618px 9.949px 0px rgba(0, 0, 0, 0.04),
    0px 1.503px 4.132px 0px rgba(0, 0, 0, 0.03),
    0px 0.543px 1.495px 0px rgba(0, 0, 0, 0.02);

  .ProseMirror {
    outline: none;

    /* Table-specific styling */
    table {
      border-collapse: collapse;
      margin: 0;
      overflow: hidden;
      table-layout: fixed;
      width: 100%;

      td,
      th {
        border: 1px solid rgba(61, 37, 20, 0.12);
        box-sizing: border-box;
        min-width: 1em;
        padding: 6px 8px;
        position: relative;
        vertical-align: top;

        > * {
          margin-bottom: 0;
        }
      }

      th {
        background-color: rgba(61, 37, 20, 0.05);
        font-weight: bold;
        text-align: left;
      }

      .selectedCell:after {
        background: rgba(61, 37, 20, 0.08);
        content: "";
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        pointer-events: none;
        position: absolute;
        z-index: 2;
      }

      .column-resize-handle {
        background-color: #6a00f5;
        bottom: -2px;
        pointer-events: none;
        position: absolute;
        right: -2px;
        top: 0;
        width: 4px;
      }
    }

    .tableWrapper {
      margin: 1.5rem 0;
      overflow-x: auto;
    }

    &.resize-cursor {
      cursor: ew-resize;
      cursor: col-resize;
    }

    pre {
      background: #2e2b29;
      border-radius: 0.5rem;
      color: #fff;
      font-family: "JetBrainsMono", monospace;
      margin: 1.5rem 0;
      padding: 0.75rem 1rem;

      code {
        background: none;
        color: inherit;
        font-size: 0.8rem;
        padding: 0;
      }
    }
  }
`

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(<App />)
