import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import HomePage from './home-page'
import fetchChuckNorrisJokes from '@services/chuck-norris-service'

jest.mock('@services/chuck-norris-service')
jest.mock('react-animated-list')
const mockedFetchChuckNorrisJoke = jest.fn()

describe('HomePage', () => {
    beforeEach(() => {
        mockedFetchChuckNorrisJoke.mockClear()
        mockedFetchChuckNorrisJoke.mockResolvedValue(null)
        localStorage.clear()
    })

    jest.mock('@services/chuck-norris-service', () => {
        return jest.fn().mockImplementation(mockedFetchChuckNorrisJoke)
    })

    it('renders the title', async () => {
        const mockedJoke = { id: '1', joke: 'Chuck Norris joke 1' }
        ;(fetchChuckNorrisJokes as jest.Mock).mockResolvedValueOnce(mockedJoke)
        render(<HomePage />)
        await waitFor(() => {
            const headerElement = screen.getByText(/Norris Funnies/i)
            expect(headerElement).toBeInTheDocument()
            const subtitleElement = screen.getByText(
                /Endless Chuckles with Chuck Norris Jokes Every 5 Seconds/i,
            )
            expect(subtitleElement).toBeInTheDocument()
        })
    })
    it('renders the saved jokes on page load', async () => {
        const mockedJoke1 = {
            id: '1',
            value: 'Chuck Norris joke 1',
            liked: true,
        }
        localStorage.setItem('likedJokes', JSON.stringify([mockedJoke1]))
        const mockedJoke = { id: '2', joke: 'mock joke' }
        ;(fetchChuckNorrisJokes as jest.Mock).mockResolvedValueOnce(mockedJoke)
        render(<HomePage />)

        await waitFor(() => {
            const jokeElement = screen.getByTestId('joke')
            expect(jokeElement).toBeInTheDocument()
        })
    })
})
