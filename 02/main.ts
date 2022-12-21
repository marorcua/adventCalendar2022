import path from 'path'
import fs from 'fs'

const text = fs.readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
const textArray = text.split('\n')
const moves = ['rock', 'paper', 'scissors']
const scores = [1, 2, 3]

const points = (first: string, second: string) => {
  const firstMove = translateLetter(first).move
  let { move, score } = translateLetter(second)
  console.log('second move', second, move, score)
  if (
    (move === 'rock' && firstMove === 'scissors') ||
    (move === 'paper' && firstMove === 'rock') ||
    (move === 'scissors' && firstMove === 'paper')
  )
    score = score + 6

  if (move === firstMove) score = score + 3

  return score
}

const translateLetter = (letter: string) => {
  let move: string = ''
  let score: number = 0
  switch (letter) {
    case 'A':
    case 'X':
      move = moves[0]
      score = 1
      break
    case 'B':
    case 'Y':
      move = moves[1]
      score = 2
      break
    case 'C':
    case 'Z':
      move = moves[2]
      score = 3
      break
    default:
      break
  }

  return { move, score }
}

function calculatePoints(firstColumn: string, secondColumn: string) {
  const firstMove = translateLetter(firstColumn).move
  const firstIndex = moves.indexOf(firstMove)

  const { increaseMove, winScore } = chooseMove(secondColumn)
  let secondIndex: number = increaseMove + firstIndex
  if (secondIndex > moves.length - 1) secondIndex = 0
  if (secondIndex === -1) secondIndex = moves.length - 1

  const secondMove: string = moves[secondIndex]
  const score: number = scores[secondIndex]

  return winScore + score
}

function chooseMove(column: string) {
  let move: number = 0
  let score: number = 0
  switch (column) {
    case 'X':
      move = -1
      score = 0
      break
    case 'B':
    case 'Y':
      move = 0
      score = 3
      break
    case 'C':
    case 'Z':
      move = 1
      score = 6
      break
    default:
      break
  }
  return { increaseMove: move, winScore: score }
}

const countPoints = textArray.reduce<number>((acc: number, elm: string) => {
  const columns = elm.split(' ')

  const score = points(columns[0], columns[1])

  return acc + score
}, 0)

const secondStrategy = textArray.reduce<number>((acc: number, elm: string) => {
  const columns = elm.split(' ')

  const score = calculatePoints(columns[0], columns[1])

  return acc + score
}, 0)

console.log('hola texto ', secondStrategy)
