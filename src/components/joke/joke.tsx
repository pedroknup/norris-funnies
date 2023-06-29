import React from 'react'
import './joke.scss'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

interface JokeProps {
    joke: ChuckNorrisJoke
}

function Joke({ joke }: JokeProps): React.ReactNode {
    return (
        <div className="joke" data-testid="joke">
            <span>{joke.value}</span>
        </div>
    )
}

export default Joke
