import { getRandomNumber } from './random-number'

export function getSize(index: number): string {
	const sizes = ['S', 'M', 'L', 'XL']
	return sizes[index]
}
