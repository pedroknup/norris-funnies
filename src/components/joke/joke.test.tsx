import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Joke from './'

describe('Joke component', () => {
    const mockJoke = {
        iconUrl: 'https://assets.chucknorris.host/img/avatar/chuck-norris.png',
        value: 'Chuck Norris can divide by zero.',
        id: '1',
        url: 'https://api.chucknorris.io/jokes/1',
    }

    it('renders the joke correctly', () => {
        render(<Joke joke={mockJoke} />)

        const jokeElement = screen.getByTestId('joke')
        const valueElement = screen.getByText(
            'Chuck Norris can divide by zero.',
        )

        expect(jokeElement).toBeInTheDocument()
        expect(valueElement).toBeInTheDocument()
    })
})
