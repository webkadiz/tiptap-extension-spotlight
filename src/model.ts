import type { ReactElement, FC } from "react"
import { SpotlightSearch } from "./search"
import { Editor } from "@tiptap/core"

export type SpotlightItemProps = {
  name: string
  icon?: (() => ReactElement) | FC
  active?: (editor: Editor) => boolean
  shortcut?: string
  command: (editor: Editor) => boolean
  label: string
  search: SpotlightSearch
  visible?: (editor: Editor) => boolean
}

export class SpotlightItem {
  _props: SpotlightItemProps
  _group: string

  constructor(props: SpotlightItemProps) {
    this._props = props
    this._group = ""
  }

  get<T extends keyof SpotlightItemProps>(key: T): SpotlightItemProps[T] {
    return this._props[key]
  }

  set<T extends keyof SpotlightItemProps>(
    key: T,
    value: SpotlightItemProps[T]
  ) {
    this._props[key] = value
  }

  configure(partialProps: Partial<SpotlightItemProps>) {
    Object.assign(this._props, partialProps)

    return this
  }
}

export type SpotlightSectionProps = {
  name: string
  label: string
}

export class SpotlightSection {
  _props: SpotlightSectionProps
  _items: SpotlightItem[]
  _filtetableItems: SpotlightItem[]

  constructor(props: SpotlightSectionProps, items: SpotlightItem[]) {
    this._props = props
    this._items = items
    this._filtetableItems = []

    for (const item of this._items) {
      item._group = this._props.name
    }
  }

  changeLabel(label: string) {
    this._props.label = label
  }

  removeItem(name: string) {
    this._items = this._items.filter((item) => item.get("name") !== name)
  }

  addItems(items: SpotlightItem[], after?: SpotlightItem) {
    if (!after) {
      this._items.push(...items)
    } else {
      const idx = this._items.indexOf(after)

      if (~idx) {
        this._items.splice(idx, 0, ...items)
      }
    }
  }

  setItems(items: SpotlightItem[]) {
    this._items = items

    for (const item of items) {
      item._group = this._props.name
    }
  }

  get(key: keyof SpotlightSectionProps) {
    return this._props[key]
  }

  getItems() {
    return this._items
  }

  getFilteredItems() {
    return this._filtetableItems
  }
}

export class SpotlightManager {
  _sections: SpotlightSection[]
  _filterableSections: SpotlightSection[]
  _indexMap: Map<SpotlightItem, number>

  constructor(sections: SpotlightSection[]) {
    this._sections = sections
    this._filterableSections = []
    this._indexMap = new Map()
  }

  removeSection(name: string) {
    this._sections = this._sections.filter(
      (section) => section._props.name !== name
    )
  }

  addSections(items: SpotlightSection[], after?: SpotlightSection) {
    if (!after) {
      this._sections.push(...items)
    } else {
      const idx = this._sections.indexOf(after)

      if (~idx) {
        this._sections.splice(idx, 0, ...items)
      }
    }
  }

  getAllItems() {
    return this._sections.map((section) => section.getItems()).flat()
  }

  getSections() {
    return this._sections
  }

  getFilterableSections() {
    return this._filterableSections
  }

  getIndexFor(item: SpotlightItem) {
    return this._indexMap.get(item) ?? 0
  }

  prepareFilterable(items: SpotlightItem[]) {
    const filterableSectionMap: Record<string, any> = {}

    this._indexMap = new Map()

    items.forEach((item, i) => {
      if (filterableSectionMap[item._group]) {
        filterableSectionMap[item._group].push(item)
      } else {
        filterableSectionMap[item._group] = [item]
      }

      this._indexMap.set(item, i)
    })

    const filterableSections = Object.keys(filterableSectionMap)
      .map((name) =>
        this._sections.find((section) => section._props.name === name)
      )
      .filter(Boolean) as SpotlightSection[]

    this._filterableSections = filterableSections

    for (const filterableSection of filterableSections) {
      filterableSection._filtetableItems =
        filterableSectionMap[filterableSection._props.name]
    }
  }
}
