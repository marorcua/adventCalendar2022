"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const text = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), 'utf-8');
const elfArray = text
    .split('\n')
    .reduce((acc, elm) => {
    let lastElf = acc[acc.length - 1];
    if (!lastElf) {
        lastElf = {
            number: 0,
            calories: 0,
        };
    }
    const add = elm * 1 || 0;
    if (elm === '') {
        const newElf = {
            number: lastElf.number + 1,
            calories: 0,
        };
        acc.push(newElf);
        return acc;
    }
    else {
        lastElf.calories = lastElf.calories + elm * 1;
        return acc;
    }
}, []);
const maxCalories = Math.max(...elfArray.map((elm) => elm.calories));
const highestCalories = elfArray.sort((a, b) => a.calories - b.calories);
const maxElf = elfArray.find((elm) => elm.calories === maxCalories);
const topThree = highestCalories
    .slice(-3)
    .reduce((acc, elm) => acc + elm.calories, 0);
