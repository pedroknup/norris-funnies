import React from 'react'
import './home-page.scss'
import RippleLoader from '@components/ripple-loader'
import Joke from '@components/joke'
import useChuckNorrisJokes from '@hooks/useChuckNorrisJokes'

function HomePage(): React.ReactNode {
    const { jokes, isLoadingJokes, handleJokeLikeClick } = useChuckNorrisJokes()

    return (
        <div className="home-page">
            <div className="background-wrapper">
                <img src="assets/chuck-norris-background.png" />
            </div>
            <div className="title-wrapper">
                <h1 className="title">Norris Funnies</h1>
                <span className="subtitle">
                    Endless Chuckles with Chuck Norris Jokes Every 5 Seconds
                </span>
            </div>

            <div className="spinner-container">
                <RippleLoader isLoading={isLoadingJokes} />
            </div>
            <div className="jokes-container" data-testid="jokes-container">
                {jokes.map(joke => (
                    <Joke
                        onJokeLikeClick={() => {
                            handleJokeLikeClick(joke.id)
                        }}
                        key={joke.id}
                        joke={joke}
                        data-testid="joke"
                    />
                ))}
            </div>
        </div>
    )
}

export default HomePage
