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
        switch (computer.choice) {
            case 'rock':
                return 'draw';
            case 'paper':
                computer.increaseScore();
                return 'lose';
            default:
                this._score += 1;
                return 'win';
        }
    }
    handlePaper() {
        switch (computer.choice) {
            case 'rock':
                this._score += 1;
                return 'win';
            case 'paper':
                return 'draw';
            default:
                computer.increaseScore();
                return 'lose';
        }
    }
    handleScissors() {
        switch (computer.choice) {
            case 'rock':
                computer.increaseScore();
                return 'lose';
            case 'paper':
                this._score += 1;
                return 'win';
            default:
                return 'draw';
        }
    }
}
class Computer {
    constructor(score) {
        this._score = score;
    }
    get score() {
        return this._score;
    }
    set score(score) {
        this._score = score;
    }
    get choice() {
        return getRandomChoice();
    }
    increaseScore() {
        this._score += 1;
    }
}
class Button {
    constructor(selector) {
        this.selector = selector;
    }
    get node() {
        const button = document.querySelector(this.selector);
        if (button != null) {
            return button;
        }
        throw new Error("Selector not found.");
    }
}
const human = new Human('Chhum', 0);
const computer = new Computer(0);
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
// Show both players' score
const showPlayersScore = () => console.log(`Human: ${human.score}     Computer: ${computer.score}`);
// Apply a click event to 
const addClickEvent = (node) => {
    const classAttr = node.getAttribute('class');
    if (classAttr != null) {
        if (classAttr.includes('rock')) {
            node.addEventListener('click', human.handleRock);
            return;
        }
        else if (classAttr.includes('paper')) {
            node.addEventListener('click', human.handlePaper);
            return;
        }
        else {
            node.addEventListener('click', human.handleScissors);
            return;
        }
    }
    throw new Error("Attribute 'class' not found.");
};
