import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

export default function areJokesArraysTheSame(
    arr1: ChuckNorrisJoke[],
    arr2: ChuckNorrisJoke[],
): boolean {
    return arr1.every(obj => arr2.some(obj2 => obj2.id === obj.id))
}
