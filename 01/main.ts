import path from 'path'
import fs from 'fs'

const text = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')

interface Elf {
  number: number
  calories: number
}
interface ElfArray extends Array<Elf> {}

const elfArray = text
  .split('\n')
  .reduce<ElfArray>((acc: ElfArray, elm: any) => {
    let lastElf: Elf = acc[acc.length - 1]
    if (!lastElf) {
      lastElf = {
        number: 0,
        calories: 0,
      }
    }
    const add: number = elm * 1 || 0

    if (elm === '') {
      const newElf: Elf = {
        number: lastElf.number + 1,
        calories: 0,
      }
      acc.push(newElf)
      return acc
    } else {
      lastElf.calories = lastElf.calories + elm * 1

      return acc
    }
  }, [])

const maxCalories = Math.max(...elfArray.map((elm) => elm.calories))

const highestCalories = elfArray.sort((a, b) => a.calories - b.calories)

const maxElf = elfArray.find((elm) => elm.calories === maxCalories)

const topThree = highestCalories
  .slice(-3)
  .reduce((acc, elm) => acc + elm.calories, 0)
