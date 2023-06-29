import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

export default async function fetchChuckNorrisJokes(): Promise<ChuckNorrisJoke> {
    try {
        const response = await fetch(`https://api.chucknorris.io/jokes/random`)
        const data = await response.json()
        const joke: ChuckNorrisJoke = {
            iconUrl: data.icon_url,
            id: data.id,
            url: data.url,
            value: data.value,
        }
        return joke
    } catch (error) {
        console.error('Error fetching jokes:', error)
        throw error
    }
}
