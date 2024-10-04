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