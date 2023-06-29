import React from 'react'
import './joke.scss'

interface JokeProps {
    joke: ChuckNorrisJoke
}

function Joke({ joke }: JokeProps): React.ReactNode {
    return (
        <div className="joke" data-testid="joke">
            <img src={joke.iconUrl} alt="Chuck Norris" />
            <span>{joke.value}</span>
        </div>
    )
}

export default Joke
