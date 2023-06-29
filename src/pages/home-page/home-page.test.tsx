import React from 'react'
import { render, screen } from '@testing-library/react'
import HomePage from './home-page'

test('renders learn react link', () => {
    render(<HomePage />)
    const linkElement = screen.getByText(/Home Page/i)
    expect(linkElement).toBeInTheDocument()
})
