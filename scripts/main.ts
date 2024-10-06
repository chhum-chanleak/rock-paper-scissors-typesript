interface Player {
  _name: string;
  _score: number;

  get name(): string;
  set name(name: string);
  get score(): number;
  set score(score: number);
  increaseScore(): void;
  handleRock(): void;
  handlePaper(): void;
  handleScissors(): void;
}

class Human implements Player {
  _name: string;
  _score: number = 0;

  constructor(name: string, score: number) {
    this._name = name;
    this._score = score;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get score(): number {
    return this._score;
  }

  set score(score: number) {
    this._score = score;
  }

  increaseScore(): void {
    this._score += 1;
  }

  handleRock(): void {
    // Show a picture of rock on human side
    rockPicture.showPicture("figure.human-side img");

    const computerChoice = computer.getRandomChoice();

    // Show a random picture on computer side
    pictureMethods.showPictureByChoice();
    console.log(`H: rock   vs   C: ${computerChoice}`);

    switch(computerChoice) {
      case 'rock':
        console.log('draw');
        updateScore();
        hideButtons();
        handleSetMessage();
        break;
      case 'paper':
        console.log('Computer wins.');
        computer.increaseScore();
        showPlayersScore();
        updateScore();
        hideButtons();
        handleSetMessage();
        break;
      default:
        console.log('Human wins.');
        human.increaseScore();
        showPlayersScore();
        updateScore();
        hideButtons();
        handleSetMessage();
    }
  }

  handlePaper(): void {
    // Show a picture of paper on human side
    paperPicture.showPicture("figure.human-side img");

    const computerChoice = computer.getRandomChoice();

    // Show a random picture on computer side
    pictureMethods.showPictureByChoice();
    console.log(`H: paper   vs   C: ${computerChoice}`);

    switch(computerChoice) {
      case 'rock':
        console.log('Human wins.');
        human.increaseScore();
        showPlayersScore();
        updateScore();
        hideButtons();
        handleSetMessage();
        break;
      case 'paper':
        console.log('draw');
        updateScore();
        hideButtons();
        handleSetMessage();
        break;
      default:
        console.log('Computer wins.');
        computer.increaseScore();
        showPlayersScore();
        updateScore();
        hideButtons();
        handleSetMessage();
    }
  }

  handleScissors(): void {
    // Show a picture of scissors on human side
    scissorsPicture.showPicture("figure.human-side img");

    const computerChoice = computer.getRandomChoice();

    // Show a random picture on computer side
    pictureMethods.showPictureByChoice();
    console.log(`H: scissors   vs   C: ${computerChoice}`);

    switch(computerChoice) {
      case 'rock':
        console.log('Computer wins.');        
        computer.increaseScore();
        showPlayersScore();
        updateScore();
        hideButtons();
        handleSetMessage();
        break;
      case 'paper':
        console.log('Human wins.');
        human.increaseScore();
        showPlayersScore();
        updateScore();
        hideButtons();
        handleSetMessage();
        break;
      default:
        console.log('draw');
        updateScore();
        hideButtons();
        handleSetMessage();
    }
  }
}

class Computer {
  _score: number;
  _choice: string = "";

  constructor(score: number) {
    this._score = score;
  }

  get score(): number {
    return this._score;
  }

  set score(score: number) {
    this._score = score;
  }

  get choice(): string {
    return this._choice;
  }

  set choice(choice: string) {
    this._choice = choice;
  }

  increaseScore(): void {
    this._score += 1;
  }

  // Generate random choice(rock, paper, or scissor)
  getRandomChoice = (): string => {
    const randomNum = Math.random();
  
    if (randomNum >= 0 && randomNum <= 0.33) {
      this._choice = 'rock';
    } else if (randomNum >= 0.33 && randomNum <= 0.66) {
      this._choice = 'paper';
    } else {
      this._choice = 'scissors';
    }
    return this._choice;
  };
}

class Button {
  selector: string;

  constructor(selector: string) {
    this.selector = selector;
  }

  get node(): Element {
    const button = document.querySelector(this.selector);

    if (button != null) {
      return button;
    }
    
    throw new Error("Selector not found.");
  }
}

class Picture {
  _url: string;

  constructor(url: string) {
    this._url = url;
  }

  showPicture(selector: string): void  {
    const destination = document.querySelector(selector) as HTMLImageElement;
    
    destination.src = this._url;
  }

  // Show picture on the computer side according to the 'computer.choice'.
  showPictureByChoice = (): void => {  
    if (computer.choice === 'rock') {
      rockPicture.showPicture('figure.computer-side img');
    } else if (computer.choice === 'paper') {
      paperPicture.showPicture('figure.computer-side img');
    } else {
      scissorsPicture.showPicture('figure.computer-side img');
    }
  }
}

// Show both players' score
const showPlayersScore = (): void => console.log(`Human: ${human.score}     Computer: ${computer.score}`);

// Apply a click event to
const addClickEvent = (node: Element): void | ErrorConstructor => {
  const classAttr = node.getAttribute('class');

  if (classAttr != null) {
    if (classAttr.includes('rock')) {
      node.addEventListener('click', human.handleRock);
      return;
    } else if (classAttr.includes('paper')) {
      node.addEventListener('click', human.handlePaper);
      return;
    } else {
      node.addEventListener('click', human.handleScissors);
      return;
    }
  }

  throw new Error("Attribute 'class' not found.");
};

// Update players' score on the '.ring'
const updateScore = (): void => {
  const humanSpanValue = document.querySelector('span.human-score > span.value') as Element;
  const computerSpanValue = document.querySelector('span.computer-score > span.value') as Element;

  humanSpanValue.textContent = `${human.score}`;
  computerSpanValue.textContent = `${computer.score}`;

  // Remove event listeners from buttons when the game is set
  if (isSet()) {
    removeClickListeners(myButtons.rock.node, myButtons.paper.node, myButtons.scissors.node);
  }
};

// Show a congratulations message when either one of the player's is 3
const handleSetMessage = (): void => {
  const setMessage = document.querySelector('.set-message') as Element;

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
const isSet = (): boolean => {
  if (human.score === 3 || computer.score === 3) {
    return true;
  }

  return false;
};

// Remove event listeners from input
const removeClickListeners = (...elements: Element[]): void => {
  for (let i = 0; i < elements.length; i += 1) {
    const elementAttr = elements[i].getAttribute('class') as string;

    if (elementAttr.includes('rock')) {
      elements[i].removeEventListener('click', human.handleRock);
    } else if (elementAttr.includes('paper')) {
      elements[i].removeEventListener('click', human.handlePaper);
    } else {
      elements[i].removeEventListener('click', human.handleScissors);
    }
  }
};

// Hide buttons when game is set.
const hideButtons = (): void => {
  const buttons = document.querySelectorAll('header .btn');

  if (isSet()) {
    for (let i = 0; i < buttons.length; i += 1 ) {
      const button = buttons[i] as HTMLElement;

      button.style.display = 'none';
    }
  }
};

const human = new Human('Chhum', 0);
const computer = new Computer(0);

const rockPicture = new Picture("../assets/rock.jpg");
const paperPicture = new Picture("../assets/paper.webp");
const scissorsPicture = new Picture("../assets/scissors.webp");
const pictureMethods = new Picture("");

// Buttons
namespace myButtons {
  // You must 'export' these variables before you can access them.
  export const rock = new Button('.btn.rock');
  export const paper = new Button('.btn.paper');
  export const scissors = new Button('.btn.scissors');
}

// Apply handle click event to each button.
addClickEvent(myButtons.rock.node);
addClickEvent(myButtons.paper.node);
addClickEvent(myButtons.scissors.node);