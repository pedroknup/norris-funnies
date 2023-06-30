import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'
import React from 'react'
import fetchChuckNorrisJokes from '@services/chuck-norris-service'

const MAX_JOKES = 3
const FETCH_INTERVAL = 2000

interface ChuckNorrisJokeHookType {
    jokes: ChuckNorrisJoke[]
    isLoadingJokes: boolean
    handleJokeLikeClick: (likedJokeId: string) => void
}

function useChuckNorrisJokes(): ChuckNorrisJokeHookType {
    const [jokes, setJokes] = React.useState<ChuckNorrisJoke[]>([])
    const [isLoadingJokes, setIsLoadingJokes] = React.useState(false)

    const addJoke = (newJoke: ChuckNorrisJoke): void => {
        setJokes(prevJokes => {
            if (prevJokes.length >= MAX_JOKES) {
                const jokeToRemove = prevJokes
                    .slice()
                    .reverse()
                    .filter(joke => !joke.liked)[0]

                if (!jokeToRemove) return prevJokes

                const updatedJokes = prevJokes
                    .slice()
                    .filter(joke => joke.id !== jokeToRemove.id)

                return [newJoke, ...updatedJokes]
            }

            return [newJoke, ...prevJokes]
        })
    }

    function fetchRandomJoke(): void {
        setIsLoadingJokes(true)
        fetchChuckNorrisJokes().then(randomJoke => {
            if (randomJoke !== null) addJoke(randomJoke)
            setIsLoadingJokes(false)
        })
    }

    function getNewJokeEvery5Seconds(): NodeJS.Timer {
        const intervalId = setInterval(() => {
            fetchRandomJoke()
        }, FETCH_INTERVAL)

        return intervalId
    }

    React.useEffect(() => {
        fetchRandomJoke()
        const intervalId = getNewJokeEvery5Seconds()
        const savedJokesRaw = localStorage.getItem('likedJokes')
        if (savedJokesRaw) {
            const savedJokes = JSON.parse(savedJokesRaw)
            savedJokes.forEach((joke: ChuckNorrisJoke) => {
                addJoke(joke)
            })
        }

        return () => {
            clearTimeout(intervalId)
        }
    }, [])

    function handleJokeLikeClick(likedJokeId: string): void {
        const foundJoke = jokes.find(joke => joke.id === likedJokeId)
        if (!foundJoke) return

        const likedJokesCount = jokes.filter(joke => joke.liked).length
        if (likedJokesCount >= MAX_JOKES && !foundJoke.liked) {
            console.log('max jokes reached')

            return
        }

        const updatedJokes = jokes.map(joke =>
            joke.id === likedJokeId ? { ...joke, liked: !joke.liked } : joke,
        )

        updateLocalStorageJokes(updatedJokes.filter(joke => joke.liked))
        setJokes(updatedJokes)
    }

    function updateLocalStorageJokes(jokes: ChuckNorrisJoke[]): void {
        localStorage.setItem('likedJokes', JSON.stringify(jokes))
    }

    return { jokes, isLoadingJokes, handleJokeLikeClick }
}

export default useChuckNorrisJokes
