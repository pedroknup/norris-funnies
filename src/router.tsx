import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import routes from './routes'
import Navbar from '@components/navbar'

const Router = (): React.ReactNode => {
    return (
        <BrowserRouter basename="/">
            <Navbar routes={routes} />
            <Routes>
                {routes.map(({ path, component }) => (
                    <Route key={path} path={path} element={component?.()} />
                ))}
            </Routes>
        </BrowserRouter>
    )
}

export default Router
