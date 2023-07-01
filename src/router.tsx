import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from '@pages/home-page/'
import FavoritesPage from '@pages/favorites'

const Router = (): React.ReactNode => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" Component={HomePage} />
                <Route path="/favorites" Component={FavoritesPage} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router
