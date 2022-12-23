"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const text = fs_1.default.readFileSync(path_1.default.join(__dirname, './input.txt'), 'utf-8');
const startOfPacket = (text, limit) => {
    const textArray = text.split('');
    const check = [];
    let point = 0;
    textArray.every((char, ind) => {
        if (check.length < limit - 1) {
            check.push(char);
        }
        else {
            const findDuplicates = [...new Set([...check, char])];
            if (findDuplicates.length === limit) {
                point = ind + 1;
                return false;
            }
            check.shift();
            check.push(char);
        }
        return check;
    });
    console.log(point);
    return point;
};
startOfPacket(text, 14);
