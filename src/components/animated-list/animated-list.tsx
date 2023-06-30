import React, { useEffect } from 'react'
import gsap from 'gsap'
import './animated-list.scss'
import { type ChuckNorrisJoke } from '@models/chuck-norris-joke'
import Joke from '@components/joke'
import usePrevious from '@hooks/usePrevious'
import areJokesArraysTheSame from '@utils/areJokesArraysTheSame'

interface AnimatedListProps {
    jokes: ChuckNorrisJoke[]
    handleJokeLikeClick?: (id: string) => void
}

function AnimatedList({
    jokes,
    handleJokeLikeClick,
}: AnimatedListProps): React.ReactNode {
    const listRef = React.useRef<HTMLDivElement | null>(null)
    const previousJokes = usePrevious(jokes)

    useEffect(() => {
        if (!listRef.current) return

        console.log('previousJokes', previousJokes)
        if (!previousJokes) {
            console.log('init')

            return
        }

        if (jokes.length > previousJokes.length) {
            gsap.fromTo(
                listRef.current,
                {
                    marginTop: -34,
                },
                {
                    marginTop: 0,
                    duration: 1,
                    delay: 1,
                },
            )
            gsap.fromTo(
                listRef.current.firstChild,
                {
                    height: 0,
                    minHeight: 0,
                    opacity: 0,
                    transform: 'scaleY(0)',
                },
                {
                    opacity: 1,
                    transform: 'scaleY(1)',
                    duration: 0.5,
                    height: 80,
                    minHeight: 80,
                    delay: 2,
                },
            )
        } else if (jokes.length === previousJokes.length) {
            const areJokesTheSame = areJokesArraysTheSame(
                previousJokes ?? [],
                jokes,
            )
            if (areJokesTheSame) return

            gsap.fromTo(
                listRef.current,
                {
                    marginTop: -34,
                },
                {
                    marginTop: 0,
                    duration: 1,
                    delay: 1,
                },
            )

            // gsap.fromTo(
            //     listRef.current.children[3],
            //     {
            //         marginTop: -34,
            //     },
            //     {
            //         marginTop: 0,
            //         duration: 1,
            //         delay: 1,
            //     },
            // )

            gsap.fromTo(
                listRef.current.children[0],
                {
                    height: 0,
                    minHeight: 0,
                    opacity: 0,
                    transform: 'scaleY(0)',
                },
                {
                    opacity: 1,
                    transform: 'scaleY(1)',
                    duration: 0.5,
                    height: 80,
                    minHeight: 80,
                    delay: 2,
                },
            )
            gsap.fromTo(
                listRef.current.children[2],
                {
                    opacity: 1,
                    transform: 'translateX(0)',
                    duration: 0.5,
                    height: 80,
                    minHeight: 80,
                },
                {
                    height: 0,
                    minHeight: 0,
                    opacity: 0,
                    transform: 'translateX(100px)',
                    marginBottom: -34,
                },
            )
        }
    }, [jokes])

    return (
        <div>
            <div
                key={`list-item-c`}
                ref={listRef}
                className="animated-list-item"
            >
                {jokes.map(joke => (
                    <Joke
                        onJokeLikeClick={() => {
                            handleJokeLikeClick?.(joke.id)
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

export default AnimatedList
