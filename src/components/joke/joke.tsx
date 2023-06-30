import React from 'react'
import './joke.scss'
import { ReactComponent as OutlineHeartIcon } from '@assets/icons/heart.svg'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

interface JokeProps {
    joke: ChuckNorrisJoke
    onJokeLikeClick?: () => void
}

function Joke({ joke, onJokeLikeClick }: JokeProps): React.ReactNode {
    return (
        <div className={`joke ${joke.liked ? 'liked' : ''}`} data-testid="joke">
            <span>{joke.value}</span>
            <button onClick={onJokeLikeClick} className="heart-button">
                <OutlineHeartIcon />
            </button>
        </div>
    )
}

export default Joke
