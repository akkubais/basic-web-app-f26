function isPrime(value: number): boolean {
  if (!Number.isInteger(value) || value < 2) return false;
  for (let divisor = 2; divisor * divisor <= value; divisor += 1) {
    if (value % divisor === 0) return false;
  }
  return true;
}

function fibonacci(index: number): number {
  let previous = 0;
  let current = 1;
  for (let position = 0; position < index; position += 1) {
    [previous, current] = [current, previous + current];
  }
  return previous;
}

function integerPower(base: number, exponent: number): string {
  const digits = [1];
  for (let count = 0; count < exponent; count += 1) {
    let carry = 0;
    for (let index = 0; index < digits.length; index += 1) {
      const product = digits[index] * Math.abs(base) + carry;
      digits[index] = product % 10;
      carry = Math.floor(product / 10);
    }
    while (carry > 0) {
      digits.push(carry % 10);
      carry = Math.floor(carry / 10);
    }
  }
  const sign = base < 0 && exponent % 2 === 1 ? "-" : "";
  return sign + digits.reverse().join("");
}

function scrabbleScore(word: string): number {
  const scores: Record<string, number> = {
    a: 1, b: 3, c: 3, d: 2, e: 1, f: 4, g: 2, h: 4, i: 1,
    j: 8, k: 5, l: 1, m: 3, n: 1, o: 1, p: 3, q: 10, r: 1,
    s: 1, t: 1, u: 1, v: 4, w: 4, x: 8, y: 4, z: 10,
  };
  return word.toLowerCase().split("").reduce(
    (total, letter) => total + (scores[letter] || 0),
    0
  );
}

export default function QueryProcessor(query: string): string {
  const normalizedQuery = query.toLowerCase();
  const numbers = (normalizedQuery.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);

  if (
    normalizedQuery.includes("both a square and a cube") &&
    numbers.length > 0
  ) {
    return numbers
      .filter((value) =>
        Number.isInteger(Math.sqrt(value)) &&
        Number.isInteger(Math.cbrt(value))
      )
      .join(", ");
  }

  if (normalizedQuery.includes("numbers are primes") && numbers.length > 0) {
    return numbers.filter(isPrime).join(", ");
  }

  if (normalizedQuery.includes("fibonacci sequence") && numbers.length > 0) {
    return String(fibonacci(numbers[0]));
  }

  if (normalizedQuery.includes(" to the power of ") && numbers.length >= 2) {
    if (Number.isInteger(numbers[0]) && Number.isInteger(numbers[1]) && numbers[1] >= 0) {
      return integerPower(numbers[0], numbers[1]);
    }
    return String(Math.pow(numbers[0], numbers[1]));
  }

  const scrabbleWord = normalizedQuery.match(/scrabble score (?:of|for) ["']?([a-z]+)/);
  if (scrabbleWord) {
    return String(scrabbleScore(scrabbleWord[1]));
  }

  const anagramTarget = normalizedQuery.match(/anagram of ["']?([a-z]+)/)?.[1];
  if (anagramTarget && normalizedQuery.includes(":")) {
    const sortedTarget = anagramTarget.split("").sort().join("");
    const choices = normalizedQuery
      .split(":")
      .pop()!
      .match(/[a-z]+/g) || [];
    const answer = choices.find(
      (choice) => choice !== anagramTarget && choice.split("").sort().join("") === sortedTarget
    );
    if (answer) return answer;
  }

  if (normalizedQuery.includes("largest") && numbers.length > 0) {
    return String(Math.max(...numbers));
  }

  if (normalizedQuery.includes("smallest") && numbers.length > 0) {
    return String(Math.min(...numbers));
  }

  if (
    normalizedQuery.includes(" multiplied by ") &&
    normalizedQuery.includes(" plus ") &&
    numbers.length >= 3
  ) {
    if (normalizedQuery.indexOf(" multiplied by ") < normalizedQuery.indexOf(" plus ")) {
      return String(numbers[0] * numbers[1] + numbers[2]);
    }
    return String(numbers[0] + numbers[1] * numbers[2]);
  }

  if (normalizedQuery.includes(" divided by ") && numbers.length >= 2) {
    return String(numbers[0] / numbers[1]);
  }

  if (
    (normalizedQuery.includes(" multiplied by ") ||
      normalizedQuery.includes(" times ")) &&
    numbers.length >= 2
  ) {
    return String(numbers[0] * numbers[1]);
  }

  if (normalizedQuery.includes(" plus ") && numbers.length >= 2) {
    return String(numbers.reduce((total, value) => total + value, 0));
  }

  if (normalizedQuery.includes(" minus ") && numbers.length >= 2) {
    return String(numbers[0] - numbers[1]);
  }

  if (
    normalizedQuery.includes("theresa may") &&
    normalizedQuery.includes("prime minister")
  ) {
    return "2016";
  }

  if (normalizedQuery.includes("eiffel tower")) {
    return "Paris";
  }

  if (normalizedQuery.includes("colour is a banana")) {
    return "yellow";
  }

  if (normalizedQuery.includes("james bond") && normalizedQuery.includes("dr no")) {
    return "Sean Connery";
  }

  if (
    normalizedQuery.includes("andrew id") ||
    normalizedQuery.includes("andrewid")
  ) {
    return "akkubais";
  }

  if (
    normalizedQuery.includes("github") &&
    (normalizedQuery.includes("username") ||
      normalizedQuery.includes("user name"))
  ) {
    return "akkubais";
  }

  if (
    normalizedQuery.includes("github") &&
    (normalizedQuery.includes("repository") ||
      normalizedQuery.includes("repo"))
  ) {
    return "https://github.com/akkubais/basic-web-app-f26";
  }

  if (normalizedQuery.includes("shakespeare")) {
    return (
      "William Shakespeare (26 April 1564 - 23 April 1616) was an " +
      "English poet, playwright, and actor, widely regarded as the greatest " +
      "writer in the English language and the world's pre-eminent dramatist."
    );
  }

  if (normalizedQuery.includes("name")) {
    return "Abdulaziz";
  }

  if (normalizedQuery.includes("age")) {
    return "67";
  }



  return "";
}
