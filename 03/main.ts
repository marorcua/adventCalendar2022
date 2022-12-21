import path from 'path'
import fs from 'fs'

const text = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
const textArray = text.split('\n')

function getCharPoints(text: string) {
  const middle: number = text.length / 2
  const firstItem: string = text.slice(0, middle)
  const secondItem: string = text.slice(middle, text.length)

  if (!firstItem || !secondItem) return 0

  const repeatedItem = firstItem
    .split('')
    .find((char) => secondItem.split('').includes(char))

  if (!repeatedItem) return 0

  //check if item is upper or lower case
  const char = repeatedItem.charCodeAt(0)

  return getPoints(char)
}

function getBadge(first: string[], second: string[], third: string[]) {
  const findDuplicates: string[] = second.filter(
    (elm) => first.indexOf(elm) !== -1
  )
  const badge: string =
    third.find((char) => findDuplicates.includes(char)) || ''
  return getPoints(badge.charCodeAt(0))
}

function getPoints(char: number) {
  let points: number = 0
  if (char >= 97) {
    points = char - 96
  } else {
    points = char - 38
  }
  return points
}

const sum = textArray.reduce((acc, elm) => {
  const newPoints: number = getCharPoints(elm)
  return newPoints + acc
}, 0)

const badges = (array: [string]) => {
  const chunkSize = 3
  let sum = 0
  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk: string[] = array.slice(i, i + chunkSize)

    sum =
      sum + getBadge(chunk[0].split(''), chunk[1].split(''), chunk[2].split(''))
  }
  return sum
}
