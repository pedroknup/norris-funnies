import React, { useEffect } from 'react'
import './favorites-page.scss'
import Joke from '@components/joke'
import { AnimatedList } from 'react-animated-list'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

const BACKGROUND_URL = `${process.env.PUBLIC_URL}/assets/chuck-norris-background.png`

function FavoritesPage(): React.ReactNode {
    const [jokes, setJokes] = React.useState<ChuckNorrisJoke[]>([])

    useEffect(() => {
        const jokes = JSON.parse(localStorage.getItem('likedJokes') ?? '[]')
        setJokes(jokes)
    }, [])

    const handleJokeLikeToggle = (id: string): void => {
        const updatedJokes = jokes.filter(joke => joke.id !== id)
        setJokes(updatedJokes)
        localStorage.setItem('likedJokes', JSON.stringify(updatedJokes))
    }

    return (
        <div className="favorites-page">
            <div className="background-wrapper">
                <img src={BACKGROUND_URL} />
            </div>
            <div className="title-wrapper">
                <h1 className="title">Liked Jokes</h1>
            </div>

            <div className="jokes-container" data-testid="jokes-container">
                {jokes.length === 0 ? (
                    <div className="no-jokes-message">
                        {`You haven't liked any jokes yet.`}
                        <br />
                        <br />
                        {`"Chuck Norris hasn't liked any jokes yet, because every joke likes Chuck Norris before he even hears it."`}
                    </div>
                ) : (
                    <AnimatedList animation={'grow'}>
                        {}
                        {jokes.map(joke => (
                            <Joke
                                onLikeToggle={() => {
                                    handleJokeLikeToggle(joke.id)
                                }}
                                key={joke.id}
                                joke={joke}
                                data-testid="joke"
                            />
                        ))}
                    </AnimatedList>
                )}
            </div>
        </div>
    )
}

export default FavoritesPage
