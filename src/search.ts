export type SpotlightSearch = {
  keywords: string[]
}

export const countMaxEntry = (query: string, keyword: string) => {
  let index = 0
  let maxEntry = 0

  if (keyword.length < 3) {
    return ~query.indexOf(keyword) ? 1 : 0
  }

  for (let index_ = 0; index_ < query.length; index_++) {
    if (query[index_] === keyword[index]) {
      index++
    } else {
      if (index >= 3) {
        maxEntry = Math.max(maxEntry, index)
      }
      index_ -= index
      index = 0
    }
  }

  if (index >= 3) maxEntry = Math.max(maxEntry, index)

  return maxEntry
}

const en = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
]

const ru = [
  "ф",
  "и",
  "с",
  "в",
  "у",
  "а",
  "п",
  "р",
  "ш",
  "о",
  "л",
  "д",
  "ь",
  "т",
  "щ",
  "з",
  "й",
  "к",
  "ы",
  "е",
  "г",
  "м",
  "ц",
  "ч",
  "н",
  "я",
]

export const toSecondLanguage = (query: string) => {
  let secondQuery = ""

  for (const char of query) {
    if (char.charCodeAt(0) > 150) {
      // russian keyboard
      secondQuery += en[ru.indexOf(char)] ?? ""
    } else {
      // english keyboard
      secondQuery += ru[en.indexOf(char)] ?? ""
    }
  }

  return secondQuery
}
