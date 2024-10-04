"use strict";
class Human {
    constructor(name, score) {
        this._score = 0;
        this._name = name;
        this._score = score;
    }
    get name() {
        return this._name;
    }
    set name(name) {
        this._name = name;
    }
    get score() {
        return this._score;
    }
    set score(score) {
        this._score = score;
    }
    handleRock() {
        switch (getRandomChoice()) {
            case 'rock':
                return 'draw';
            case 'paper':
                return 'lose';
            default:
                return 'win';
        }
    }
    handlePaper() {
    }
    handleScissors() {
    }
}
const human = new Human('Chhum', 0);
// Generate random choice(rock, paper, or scissor)
const getRandomChoice = () => {
    let choice;
    const randomNum = Math.random();
    if (randomNum >= 0 && randomNum <= 0.33) {
        choice = 'rock';
    }
    else if (randomNum >= 0.33 && randomNum <= 0.66) {
        choice = 'paper';
    }
    else {
        choice = 'scissors';
    }
    return choice;
};
