import React from 'react'
import './home-page.scss'
import RippleLoader from '@components/ripple-loader'
import Joke from '@components/joke'
import useChuckNorrisJokes from '@hooks/useChuckNorrisJokes'
import { AnimatedList } from 'react-animated-list'

const TITLE = 'Norris Funnies'
const SUBTITLE =
    'Generating jokes so funny, even Chuck Norris cracks a smile 🤣'

const BACKGROUND_URL = `${process.env.PUBLIC_URL}/assets/chuck-norris-background.png`

function HomePage(): React.ReactNode {
    const { jokes, isLoadingJokes, handleJokeLikeToggle } =
        useChuckNorrisJokes()

    return (
        <div className="home-page">
            <div className="background-wrapper">
                <img src={BACKGROUND_URL} />
            </div>
            <div className="title-wrapper">
                <h1 className="title">{TITLE}</h1>
                <span className="subtitle">{SUBTITLE}</span>
            </div>

            <div className="spinner-container">
                <RippleLoader isLoading={isLoadingJokes} />
            </div>
            <div className="jokes-container" data-testid="jokes-container">
                <AnimatedList animation={'grow'}>
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
            </div>
        </div>
    )
}

export default HomePage
