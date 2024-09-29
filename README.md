## Tiptap Spotlight

Tiptap Spotlight - extension for fast adding content, use only slash to do everything.

With this thing you can do the following quickly:

- add blocks, write /h1 to add a first level heading
- replace one block with another, write /turnbull et to turn the text into a bulleted list
- format text, write /bold to start writing bold, write /bold again to stop writing bold
- write text in different colors, write /blue to write text in blue
- align text, write /center to align it to the center
- perform actions, write /delete to delete a paragraph, and possibly its parent as well

## How to use

provide Spotlight to extensions, you will receive the basic package:

```javascript
const editor = useEditor({
  extensions: [Spotlight],
})
```

If you need some modifications, see below

#### SpotlightItem

If you need to customize a spotlight item, you take it and call configure, for example, change the label of the text to a paragraph:

```javascript
SpotlightText.configure({
  label: "Paragraph",
})
```

SpotlightItem has the following structure and fields for modifications:

```javascript
type SpotlightItemProps = {
  name: string // just identificator name
  icon?: (() => ReactElement) | FC // displayed icon
  active?: (editor: Editor) => boolean // at what point to show the check mark on the item
  shortcut?: string // displayed shortcut label
  command: (editor: Editor) => boolean // called when an item is selected
  label: string // displayed name in the menu
  search: {
    keywords: string[] // used in search (when typing) for filter items
  }
  visible?: (editor: Editor) => boolean // show item in menu or not
}
```

#### SpotlightSection

If you need to customize a spotlight section (set of items), you have such methods:

remove item:

```javascript
SpotlightBlockSection.removeItem("headin1")
```

addItems, at the end or after the specified:

```javascript
SpotlightBlockSection.addItems(
  [
    SpotlightHeading2,
    new SpotlightItem({
      name: "custom item",
    }),
  ],
  SpotlightHeading1
)
```

setItems: erases all items with new ones.

changeLabel: changes the display name of a section.

#### SpotlightManager

If you need to customize sections on top level, for example their order, then you can take the basic manager, which is used in the default delivery:

```javascript
// put blocks section after turn section

baseSpotlightManager.removeSection("block")

baseSpotlightManager.addSections([SpotlightBlockSection], SpotlightTurnSection)
```

if your spotlight has too many modifications, then maybe it's worth creating your own manager:

```javascript
new SpolightManager([
  new SpotlightSection({name: 'inline', 'Inline blocks'}, [
    new SpotlightItem(),
    new SpotlightItem(),
    ...
  ])
  new SpotlightSection()
  ...
])
```
