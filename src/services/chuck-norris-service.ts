export default async function fetchChuckNorrisJokes(count: number) {
    try {
        const response = await fetch(
            `https://api.chucknorris.io/jokes/random/${count}`,
        )
        const data = await response.json()
        const joke: ChuckNorrisJoke = { 
            iconUrl: data.icon_url,
            ...data
        }
        return joke
    } catch (error) {
        console.error('Error fetching jokes:', error)
        throw error
    }
}
