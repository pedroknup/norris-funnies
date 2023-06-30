import React from 'react'
import './joke.scss'
import OutlineHeartIcon from '@assets/icons/heart'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'

interface JokeProps {
    joke: ChuckNorrisJoke
    onJokeLikeClick?: () => void
}

function Joke({ joke, onJokeLikeClick }: JokeProps): React.ReactNode {
    const [shouldTriggerAnimation, setShouldTriggerAnimation] =
        React.useState<boolean>(false)

    const handleLikeClick = (): void => {
        if (!joke.liked) {
            setShouldTriggerAnimation(true)
            setTimeout(() => {
                setShouldTriggerAnimation(false)
            }, 1000)
        }
        onJokeLikeClick?.()
    }

    return (
        <div className={`joke ${joke.liked ? 'liked' : ''}`} data-testid="joke">
            <span>{joke.value}</span>
            <button
                onClick={handleLikeClick}
                className={`heart-button ${
                    shouldTriggerAnimation ? 'liked' : ''
                }`}
                data-testid="like-button"
            >
                <OutlineHeartIcon />
            </button>
        </div>
    )
}

export default Joke
