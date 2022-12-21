"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const text = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), 'utf-8');
const textArray = text.split('\n');
function getRange(start, end) {
    const range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}
let checker = (arr, target) => target.every((v) => arr.includes(v));
let checkOverlap = (arr, target) => arr.filter((elm) => target.includes(elm)).length;
let checkOverlapPairs = (arr, target) => target.some((v) => arr.includes(v));
function containedPairs(first, second) {
    const firstPair = first.split('-');
    const firstRange = getRange(+firstPair[0], +firstPair[1]);
    const secondPair = second.split('-');
    const secondRange = getRange(+secondPair[0], +secondPair[1]);
    let counter = 0;
    if (checker(firstRange, secondRange) || checker(secondRange, firstRange))
        counter = 1;
    let overlap = checkOverlap(firstRange, secondRange);
    let overlapPairs = 0;
    if (checkOverlapPairs(firstRange, secondRange))
        overlapPairs = 1;
    return { counter, overlap, overlapPairs };
}
console.log(textArray.reduce((acc, elm) => {
    const pairs = elm.split(',');
    return acc + containedPairs(pairs[0], pairs[1]).counter;
}, 0), textArray.reduce((acc, elm) => {
    const pairs = elm.split(',');
    return acc + containedPairs(pairs[0], pairs[1]).overlapPairs;
}, 0));
