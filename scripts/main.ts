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

  handleRock(): string {
    switch(getRandomChoice()) {
      case 'rock':
        return 'draw';
      case 'paper':
        return 'lose';
      default:
        return 'win';
    }
  }

  handlePaper(): string {
    switch(getRandomChoice()) {
      case 'rock':
        return 'win';
      case 'paper':
        return 'draw';
      default:
        return 'lose';
    }
  }

  handleScissors(): string {
    switch(getRandomChoice()) {
      case 'rock':
        return 'lose';
      case 'paper':
        return 'win';
      default:
        return 'draw';
    }
  }
}

const human = new Human('Chhum', 0);

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