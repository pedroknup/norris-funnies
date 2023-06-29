import React from 'react'
import './home-page.scss'
import Spinner from '@components/spinner'
import Joke from '@components/joke'
import fetchChuckNorrisJokes from '@services/chuck-norris-service'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

const FETCH_INTERVAL = 5000

function HomePage(): React.ReactNode {
    const [jokes, setJokes] = React.useState<ChuckNorrisJoke[]>([])
    const [isLoadingJokes, setIsLoadingJokes] = React.useState(false)

    function addJoke(newJoke: ChuckNorrisJoke): void {
        setJokes(prevJokes => {
            if (prevJokes.length === 10) {
                // Remove the oldest joke ([9]) by slicing the array
                prevJokes = prevJokes.slice(0, 9)
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
        return () => {
            clearTimeout(intervalId)
        }
    }, [])

    return (
        <div className="home-page">
            <h1>Home Page</h1>

            {isLoadingJokes ? (
                <div className="spinner-container">
                    <Spinner />
                </div>
            ) : (
                <div className="jokes-container">
                    {jokes.map((joke, index) => (
                        <Joke key={index} joke={joke} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default HomePage
