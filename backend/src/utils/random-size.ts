import { getRandomNumber } from "./random-number";

export function getRandomSize(): string {
    const sizes = ['S', 'M', 'L', 'XL'];
    const randomIndex = getRandomNumber(0, sizes.length - 1);
    return sizes[randomIndex];
  }
  