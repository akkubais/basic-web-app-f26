export default function QueryProcessor(query: string): string {
  const normalizedQuery = query.toLowerCase();
  const numbers = (normalizedQuery.match(/-?\d+(?:\.\d+)?/g) || []).map(Number);

  if (normalizedQuery.includes("largest") && numbers.length > 0) {
    return String(Math.max(...numbers));
  }

  if (normalizedQuery.includes("smallest") && numbers.length > 0) {
    return String(Math.min(...numbers));
  }

  if (normalizedQuery.includes(" plus ") && numbers.length >= 2) {
    return String(numbers[0] + numbers[1]);
  }

  if (normalizedQuery.includes(" minus ") && numbers.length >= 2) {
    return String(numbers[0] - numbers[1]);
  }

  if (
    (normalizedQuery.includes(" multiplied by ") ||
      normalizedQuery.includes(" times ")) &&
    numbers.length >= 2
  ) {
    return String(numbers[0] * numbers[1]);
  }

  if (normalizedQuery.includes(" divided by ") && numbers.length >= 2) {
    return String(numbers[0] / numbers[1]);
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
