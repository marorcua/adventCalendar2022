import path from 'path'
import fs from 'fs'

const text = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
const textArray = text.split('\n')

const crates = textArray.slice(0, textArray.indexOf(''))
const moves = textArray.slice(textArray.indexOf('') + 1, textArray.length)
const crateArrays = (arr: string[]) => {
  const arrNumber = arr.pop()?.split('') || []
  const stacks = arr.map((e) => e.split(''))

  const newArr: string[][] = []
  arrNumber.map((elm, ind) => {
    const arr = []
    if (elm !== ' ') {
      let stack = stacks
        .map((e) => e.filter((elm, i) => elm !== ' ' && i === ind))
        .flat()
      newArr.push(stack)
    }
  })
  return newArr
}

const cratesArray = crateArrays(crates)

const getMoves = (text: string[]) => {
  const secuence = text.map((e) => {
    const moveArray = e
      .split('move ')
      .join(',')
      .split(' from ')
      .join(',')
      .split(' to ')
      .join(',')
      .split(',')
    return moveArray.filter((m) => +m * 1).map(Number)
  })
  return secuence
}

const moveCrates = (secuences: number[][], crates: string[][]) => {
  for (const secuence of secuences) {
    let [number, initialCrate, finalCrate] = secuence
    const crateLength = crates[initialCrate - 1].length
    if (number === 1) {
      for (let i = 1; i <= number; i++) {
        const element = crates[initialCrate - 1].shift() || ''
        crates[finalCrate - 1].unshift(element)
      }
    } else {
      const element = crates[initialCrate - 1].splice(0, number) || ''
      crates[finalCrate - 1].unshift(...element)
    }
  }
  return crates
}
const movements = getMoves(moves)

const finalCrates = moveCrates(movements, cratesArray)

console.log(finalCrates.map((e) => e[0]).join(''))
