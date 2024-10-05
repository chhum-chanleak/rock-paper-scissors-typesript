interface Player {
  _name: string;
  _score: number;

  get name(): string;
  set name(name: string);
  get score(): number;
  set score(score: number);
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

  handleRock(): string {
    switch(computer.choice) {
      case 'rock':
        return 'draw';
      case 'paper':
        computer.increaseScore();
        return 'lose';
      default:
        this.increaseScore();
        return 'win';
    }
  }

  handlePaper(): string {
    switch(computer.choice) {
      case 'rock':
        this.increaseScore();
        return 'win';
      case 'paper':
        return 'draw';
      default:
        computer.increaseScore();
        return 'lose';
    }
  }

  handleScissors(): string {
    switch(computer.choice) {
      case 'rock':
        computer.increaseScore();
        return 'lose';
      case 'paper':
        this.increaseScore();
        return 'win';
      default:
        return 'draw';
    }
  }
}

class Computer {
  _score: number;

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
    return getRandomChoice();
  }

  increaseScore(): void {
    this._score += 1;
  }
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

const human = new Human('Chhum', 0);
const computer = new Computer(0);

// Generate random choice(rock, paper, or scissor)
const getRandomChoice = (): string => {
  let choice: string;
  const randomNum = Math.random();

  if (randomNum >= 0 && randomNum <= 0.33) {
    choice = 'rock';
  } else if (randomNum >= 0.33 && randomNum <= 0.66) {
    choice = 'paper';
  } else {
    choice = 'scissors';
  }
  return choice;
};

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
