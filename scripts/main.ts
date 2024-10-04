interface Player {
  name: string;
  score: number;

  getName(): string;
  setName(name: string): void;
  getScore(): number;
  setScore(score: number): void;
  handleRock(): void;
  handlePaper(): void;
  handleScissors(): void;
}

const getRandomChoice = (): string => {
  let choice: string;
  const randomNum = Math.random();

  if (randomNum >= 0 && randomNum <= 0.33) {
    choice = 'rock';
  } else if (randomNum >= 33 && randomNum <= 0.66) {
    choice = 'paper';
  } else {
    choice = 'scissors';
  }
  return choice;
};