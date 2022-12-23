import path from 'path'
import fs from 'fs'

const text = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')

const startOfPacket = (text: string, limit: number): number => {
  const textArray = text.split('')
  const check: string[] = []
  let point = 0
  textArray.every((char, ind) => {
    if (check.length < limit - 1) {
      check.push(char)
    } else {
      const findDuplicates = [...new Set([...check, char])]
      if (findDuplicates.length === limit) {
        point = ind + 1
        return false
      }

      check.shift()
      check.push(char)
    }
    return check
  })
  console.log(point)
  return point
}

startOfPacket(text, 14)
