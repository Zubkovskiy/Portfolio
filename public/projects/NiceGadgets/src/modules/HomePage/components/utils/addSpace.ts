export const addSpace = (word: string): string =>
  word.length > 2 ? `${word.slice(0, -2)} ${word.slice(-2)}` : word;
