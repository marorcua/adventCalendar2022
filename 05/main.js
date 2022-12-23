"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const text = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), 'utf-8');
const textArray = text.split('\n');
const crates = textArray.slice(0, textArray.indexOf(''));
const moves = textArray.slice(textArray.indexOf('') + 1, textArray.length);
const crateArrays = (arr) => {
    var _a;
    const arrNumber = ((_a = arr.pop()) === null || _a === void 0 ? void 0 : _a.split('')) || [];
    const stacks = arr.map((e) => e.split(''));
    const newArr = [];
    arrNumber.map((elm, ind) => {
        const arr = [];
        if (elm !== ' ') {
            let stack = stacks
                .map((e) => e.filter((elm, i) => elm !== ' ' && i === ind))
                .flat();
            newArr.push(stack);
        }
    });
    return newArr;
};
const cratesArray = crateArrays(crates);
const getMoves = (text) => {
    const secuence = text.map((e) => {
        const moveArray = e
            .split('move ')
            .join(',')
            .split(' from ')
            .join(',')
            .split(' to ')
            .join(',')
            .split(',');
        return moveArray.filter((m) => +m * 1).map(Number);
    });
    return secuence;
};
const moveCrates = (secuences, crates) => {
    for (const secuence of secuences) {
        let [number, initialCrate, finalCrate] = secuence;
        const crateLength = crates[initialCrate - 1].length;
        if (number === 1) {
            for (let i = 1; i <= number; i++) {
                const element = crates[initialCrate - 1].shift() || '';
                crates[finalCrate - 1].unshift(element);
            }
        }
        else {
            const element = crates[initialCrate - 1].splice(0, number) || '';
            crates[finalCrate - 1].unshift(...element);
        }
    }
    return crates;
};
const movements = getMoves(moves);
const finalCrates = moveCrates(movements, cratesArray);
console.log(finalCrates.map((e) => e[0]).join(''));
