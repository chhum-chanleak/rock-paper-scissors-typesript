"use strict";
// class Human implements Player {
//   private _name: string;
//   private _score: number = 0;
//   constructor(name: string, score: number) {
//     this._name = name;
//     this._score = score;
//   }
//   get name(): string {
//     return this._name;
//   }
//   set name(name: string) {
//     this._name = name;
//   }
//   get score(): number {
//     return this._score;
//   }
//   set score(score: number) {
//     this._score = score;
//   }
// }
// Generate random choice(rock, paper, or scissor)
const getRandomChoice = () => {
    let choice;
    const randomNum = Math.random();
    if (randomNum >= 0 && randomNum <= 0.33) {
        choice = 'rock';
    }
    else if (randomNum >= 33 && randomNum <= 0.66) {
        choice = 'paper';
    }
    else {
        choice = 'scissors';
    }
    return choice;
};
