import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './'
import type IRoutes from '@models/routes-type'
import '@testing-library/jest-dom/extend-expect'

const routes: IRoutes[] = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
]

describe('Navbar', () => {
    test('renders the navbar with correct routes', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <Navbar routes={routes} />
            </MemoryRouter>,
        )

        const homeLink = screen.getByRole('link', { name: 'Home' })
        const aboutLink = screen.getByRole('link', { name: 'About' })
        const contactLink = screen.getByRole('link', { name: 'Contact' })

        expect(homeLink).toBeInTheDocument()
        expect(aboutLink).toBeInTheDocument()
        expect(contactLink).toBeInTheDocument()
    })

    test('adds active class to the current page link', () => {
        render(
            <MemoryRouter initialEntries={['/about']}>
                <Navbar routes={routes} />
            </MemoryRouter>,
        )

        const homeLink = screen.getByRole('link', { name: 'Home' })
        const aboutLink = screen.getByRole('link', { name: 'About' })
        const contactLink = screen.getByRole('link', { name: 'Contact' })

        expect(homeLink).not.toHaveClass('active')
        expect(aboutLink).toHaveClass('active')
        expect(contactLink).not.toHaveClass('active')
    })
})
