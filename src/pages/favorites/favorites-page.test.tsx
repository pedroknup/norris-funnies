import React from 'react'
import { render, screen } from '@testing-library/react'
import FavoritesPage from './'
import '@testing-library/jest-dom/extend-expect'

const mockJokes = [
    { id: '1', joke: 'Chuck Norris joke 1' },
    { id: '2', joke: 'Chuck Norris joke 2' },
]

describe('FavoritesPage', () => {
    beforeEach(() => {
        localStorage.setItem('likedJokes', JSON.stringify(mockJokes))
    })

    afterEach(() => {
        localStorage.clear()
    })

    test('renders the liked jokes', () => {
        render(<FavoritesPage />)

        const jokeElements = screen.getAllByTestId('joke')
        expect(jokeElements).toHaveLength(mockJokes.length)
    })
})
