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
        pictureMethods.setFigureCaption('figure.human-side > .figure-caption');
        const computerChoice = computer.getRandomChoice();
        // Show a random picture on computer side
        pictureMethods.showPictureByComputerChoice();
        // Apply figcaption's textContent according to image
        pictureMethods.setFigureCaption('figure.computer-side > .figure-caption');
        console.log(`H: rock   vs   C: ${computerChoice}`);
        switch (computerChoice) {
            case 'rock':
                console.log('draw');
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
                break;
            case 'paper':
                console.log('Computer wins.');
                computer.increaseScore();
                showPlayersScore();
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
                break;
            default:
                console.log('Human wins.');
                human.increaseScore();
                showPlayersScore();
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
        }
    }
    handlePaper() {
        // Show a picture of paper on human side
        paperPicture.showPicture("figure.human-side img");
        pictureMethods.setFigureCaption('figure.human-side > .figure-caption');
        const computerChoice = computer.getRandomChoice();
        // Show a random picture on computer side
        pictureMethods.showPictureByComputerChoice();
        // Apply figcaption according to image
        pictureMethods.setFigureCaption('figure.computer-side > .figure-caption');
        console.log(`H: paper   vs   C: ${computerChoice}`);
        switch (computerChoice) {
            case 'rock':
                console.log('Human wins.');
                human.increaseScore();
                showPlayersScore();
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
                break;
            case 'paper':
                console.log('draw');
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
                break;
            default:
                console.log('Computer wins.');
                computer.increaseScore();
                showPlayersScore();
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
        }
    }
    handleScissors() {
        // Show a picture of scissors on human side
        scissorsPicture.showPicture("figure.human-side img");
        pictureMethods.setFigureCaption('figure.human-side > .figure-caption');
        const computerChoice = computer.getRandomChoice();
        // Show a random picture on computer side
        pictureMethods.showPictureByComputerChoice();
        // Apply figcaption according to image
        pictureMethods.setFigureCaption('figure.computer-side > .figure-caption');
        console.log(`H: scissors   vs   C: ${computerChoice}`);
        switch (computerChoice) {
            case 'rock':
                console.log('Computer wins.');
                computer.increaseScore();
                showPlayersScore();
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
                break;
            case 'paper':
                console.log('Human wins.');
                human.increaseScore();
                showPlayersScore();
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
                break;
            default:
                console.log('draw');
                updateScore();
                hideButtons();
                handleSetMessage();
                handleRestartButton();
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
        // Show picture on the computer side according to the 'computer.choice'.
        this.showPictureByComputerChoice = () => {
            if (computer.choice === 'rock') {
                rockPicture.showPicture('figure.computer-side img');
            }
            else if (computer.choice === 'paper') {
                paperPicture.showPicture('figure.computer-side img');
            }
            else {
                scissorsPicture.showPicture('figure.computer-side img');
            }
        };
        // Set figure caption according to image
        this.setFigureCaption = (selector) => {
            const figureCaption = document.querySelector(selector);
            const img = figureCaption.previousElementSibling;
            if (img.src) {
                if (img.src.includes('rock')) {
                    figureCaption.textContent = 'ROCK';
                }
                else if (img.src.includes('paper')) {
                    figureCaption.textContent = 'PAPER';
                }
                else {
                    figureCaption.textContent = 'SCISSORS';
                }
            }
        };
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
// Update players' score on the '.ring'
const updateScore = () => {
    const humanSpanValue = document.querySelector('span.human-score > span.value');
    const computerSpanValue = document.querySelector('span.computer-score > span.value');
    humanSpanValue.textContent = `${human.score}`;
    computerSpanValue.textContent = `${computer.score}`;
    // Remove event listeners from buttons when the game is set
    if (isSet()) {
        removeClickListeners(myButtons.rock.node, myButtons.paper.node, myButtons.scissors.node);
    }
};
// Show a congratulations message when either one of the player's is 3
const handleSetMessage = () => {
    const setMessage = document.querySelector('.set-message');
    if (isSet()) {
        // When human wins
        if (human.score > computer.score) {
            setMessage.textContent = `Congratulations! Human wins.`;
        }
        // When computer wins 
        else {
            setMessage.textContent = `Try again! Computer wins.`;
        }
    }
};
// Check when the game is set
const isSet = () => {
    if (human.score === 3 || computer.score === 3) {
        return true;
    }
    return false;
};
// Remove event listeners from input
const removeClickListeners = (...elements) => {
    for (let i = 0; i < elements.length; i += 1) {
        const elementAttr = elements[i].getAttribute('class');
        if (elementAttr.includes('rock')) {
            elements[i].removeEventListener('click', human.handleRock);
        }
        else if (elementAttr.includes('paper')) {
            elements[i].removeEventListener('click', human.handlePaper);
        }
        else {
            elements[i].removeEventListener('click', human.handleScissors);
        }
    }
};
// Hide buttons when game is set.
const hideButtons = () => {
    const buttons = document.querySelectorAll('header .btn');
    if (isSet()) {
        for (let i = 0; i < buttons.length; i += 1) {
            const button = buttons[i];
            button.style.display = 'none';
        }
    }
};
// Apply functionality for 'Restart' button
const handleRestartButton = () => {
    const restartButton = document.querySelector('.btn.restart');
    if (isSet()) {
        restartButton.style.display = 'inline';
    }
    restartButton.addEventListener('click', () => {
        // Hide the 'Restart' button
        restartButton.style.display = 'none';
        // Reload the page
        location.reload();
    });
};
const human = new Human('Chhum', 0);
const computer = new Computer(0);
const rockPicture = new Picture("../assets/rock.jpg");
const paperPicture = new Picture("../assets/paper.webp");
const scissorsPicture = new Picture("../assets/scissors.webp");
const pictureMethods = new Picture("");
// Buttons
var myButtons;
(function (myButtons) {
    // You must 'export' these variables before you can access them.
    myButtons.rock = new Button('.btn.rock');
    myButtons.paper = new Button('.btn.paper');
    myButtons.scissors = new Button('.btn.scissors');
})(myButtons || (myButtons = {}));
// Apply handle click event to each button.
addClickEvent(myButtons.rock.node);
addClickEvent(myButtons.paper.node);
addClickEvent(myButtons.scissors.node);
