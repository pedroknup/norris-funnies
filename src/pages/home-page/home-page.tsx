import React from 'react'
import './home-page.scss'
import RippleLoader from '@components/ripple-loader'
import Joke from '@components/joke'
import fetchChuckNorrisJokes from '@services/chuck-norris-service'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

const FETCH_INTERVAL = 2000
const MAX_JOKES = 5

function HomePage(): React.ReactNode {
    const [jokes, setJokes] = React.useState<ChuckNorrisJoke[]>([])
    const [isLoadingJokes, setIsLoadingJokes] = React.useState(false)

    function addJoke(newJoke: ChuckNorrisJoke): void {
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

    const handleJokeLikeClick = (likedJokeId: string): void => {
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

    const updateLocalStorageJokes = (jokes: ChuckNorrisJoke[]): void => {
        localStorage.setItem('likedJokes', JSON.stringify(jokes))
    }

    return (
        <div className="home-page">
            <div className="background-wrapper">
                <img src="assets/chuck-norris-background.png" />
            </div>
            <div className="title-wrapper">
                <h1 className="title">Chuck Norris Jokes</h1>
                <span className="subtitle">Lorem ipsum dolor sit amet</span>
            </div>
            <button
                onClick={() => {
                    localStorage.clear()
                }}
            >
                reset cache
            </button>

            <div className="spinner-container">
                <RippleLoader isLoading={isLoadingJokes} />
            </div>
            <div className="jokes-container">
                {jokes.map(joke => (
                    <Joke
                        onJokeLikeClick={() => {
                            handleJokeLikeClick(joke.id)
                        }}
                        key={joke.id}
                        joke={joke}
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage
