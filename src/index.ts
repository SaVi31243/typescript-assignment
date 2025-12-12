const greeting: string = "Привіт, TypeScript!";
const year: number = 2025;
const isLearning: boolean = true;

function showMessage(message: string, year: number, learning: boolean): void {
  console.log(`${message} Рік: ${year}. Навчання триває: ${learning}`);
}

showMessage(greeting, year, isLearning);
