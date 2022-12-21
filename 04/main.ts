import path from 'path'
import fs from 'fs'

const text = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
const textArray = text.split('\n')

function getRange(start: number, end: number): [] | number[] {
  const range = []
  for (let i = start; i <= end; i++) {
    range.push(i)
  }

  return range
}
let checker = (arr: number[], target: number[]) =>
  target.every((v) => arr.includes(v))

let checkOverlap = (arr: number[], target: number[]) =>
  arr.filter((elm) => target.includes(elm)).length

let checkOverlapPairs = (arr: number[], target: number[]) =>
  target.some((v) => arr.includes(v))

function containedPairs(
  first: string,
  second: string
): { counter: number; overlap: number; overlapPairs: number } {
  const firstPair = first.split('-')
  const firstRange = getRange(+firstPair[0], +firstPair[1])

  const secondPair = second.split('-')
  const secondRange = getRange(+secondPair[0], +secondPair[1])

  let counter = 0
  if (checker(firstRange, secondRange) || checker(secondRange, firstRange))
    counter = 1

  let overlap = checkOverlap(firstRange, secondRange)
  let overlapPairs = 0
  if (checkOverlapPairs(firstRange, secondRange)) overlapPairs = 1

  return { counter, overlap, overlapPairs }
}

console.log(
  textArray.reduce((acc, elm) => {
    const pairs = elm.split(',')
    return acc + containedPairs(pairs[0], pairs[1]).counter
  }, 0),
  textArray.reduce((acc, elm) => {
    const pairs = elm.split(',')
    return acc + containedPairs(pairs[0], pairs[1]).overlapPairs
  }, 0)
)
