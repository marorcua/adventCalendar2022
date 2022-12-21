"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const text = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), 'utf-8');
const textArray = text.split('\n');
function getCharPoints(text) {
    const middle = text.length / 2;
    const firstItem = text.slice(0, middle);
    const secondItem = text.slice(middle, text.length);
    if (!firstItem || !secondItem)
        return 0;
    const repeatedItem = firstItem
        .split('')
        .find((char) => secondItem.split('').includes(char));
    if (!repeatedItem)
        return 0;
    //check if item is upper or lower case
    const char = repeatedItem.charCodeAt(0);
    return getPoints(char);
}
function getBadge(first, second, third) {
    const findDuplicates = second.filter((elm) => first.indexOf(elm) !== -1);
    const badge = third.find((char) => findDuplicates.includes(char)) || '';
    return getPoints(badge.charCodeAt(0));
}
function getPoints(char) {
    let points = 0;
    if (char >= 97) {
        points = char - 96;
    }
    else {
        points = char - 38;
    }
    return points;
}
const sum = textArray.reduce((acc, elm) => {
    const newPoints = getCharPoints(elm);
    return newPoints + acc;
}, 0);
const badges = (array) => {
    const chunkSize = 3;
    let sum = 0;
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        sum =
            sum + getBadge(chunk[0].split(''), chunk[1].split(''), chunk[2].split(''));
    }
    return sum;
};
