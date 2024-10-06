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
    increaseScore() {
        this._score += 1;
    }
    handleRock() {
        // Show a picture of rock on human side
        rockPicture.showPicture("figure.human-side img");
        const computerChoice = computer.getRandomChoice();
        console.log(`H: rock   vs   C: ${computerChoice}`);
        switch (computerChoice) {
            case 'rock':
                console.log('draw');
                break;
            case 'paper':
                console.log('Computer wins.');
                computer.increaseScore();
                showPlayersScore();
                break;
            default:
                console.log('Human wins.');
                human.increaseScore();
                showPlayersScore();
                break;
        }
    }
    handlePaper() {
        // Show a picture of paper on human side
        paperPicture.showPicture("figure.human-side img");
        const computerChoice = computer.getRandomChoice();
        console.log(`H: paper   vs   C: ${computerChoice}`);
        switch (computerChoice) {
            case 'rock':
                console.log('Human wins.');
                human.increaseScore();
                showPlayersScore();
                break;
            case 'paper':
                console.log('draw');
                break;
            default:
                console.log('Computer wins.');
                computer.increaseScore();
                showPlayersScore();
                break;
        }
    }
    handleScissors() {
        // Show a picture of scissors on human side
        scissorsPicture.showPicture("figure.human-side img");
        const computerChoice = computer.getRandomChoice();
        console.log(`H: scissors   vs   C: ${computerChoice}`);
        switch (computerChoice) {
            case 'rock':
                console.log('Computer wins.');
                computer.increaseScore();
                showPlayersScore();
                break;
            case 'paper':
                console.log('Human wins.');
                human.increaseScore();
                showPlayersScore();
                break;
            default:
                console.log('draw');
        }
    }
}
class Computer {
    constructor(score) {
        this._choice = "";
        // Generate random choice(rock, paper, or scissor)
        this.getRandomChoice = () => {
            const randomNum = Math.random();
            if (randomNum >= 0 && randomNum <= 0.33) {
                this._choice = 'rock';
            }
            else if (randomNum >= 0.33 && randomNum <= 0.66) {
                this._choice = 'paper';
            }
            else {
                this._choice = 'scissors';
            }
            return this._choice;
        };
        this._score = score;
    }
    get score() {
        return this._score;
    }
    set score(score) {
        this._score = score;
    }
    get choice() {
        return this._choice;
    }
    set choice(choice) {
        this._choice = choice;
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
class Picture {
    constructor(url) {
        this._url = url;
    }
    showPicture(selector) {
        const destination = document.querySelector(selector);
        destination.src = this._url;
    }
}
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
const showRandomPicture = () => {
    const randomNum = Math.random();
    if (randomNum >= 0 && randomNum <= 0.33) {
        rockPicture.showPicture('figure.computer-side img');
    }
    else if (randomNum >= 0.33 && randomNum <= 0.66) {
        paperPicture.showPicture('figure.computer-side img');
    }
    else {
        scissorsPicture.showPicture('figure.computer-side img');
    }
};
const human = new Human('Chhum', 0);
const computer = new Computer(0);
const rockPicture = new Picture("../assets/rock.jpg");
const paperPicture = new Picture("../assets/paper.webp");
const scissorsPicture = new Picture("../assets/scissors.webp");
// Buttons
var myButtons;
(function (myButtons) {
    // You must 'export' these variables before you can access them.
    myButtons.rock = new Button('.btn.rock');
    myButtons.paper = new Button('.btn.paper');
    myButtons.scissors = new Button('.btn.scissors');
})(myButtons || (myButtons = {}));
// Apply event to each button.
addClickEvent(myButtons.rock.node);
addClickEvent(myButtons.paper.node);
addClickEvent(myButtons.scissors.node);
