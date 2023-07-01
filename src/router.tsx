import React from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'

import './App.scss'
import routes from './routes'
import Navbar from '@components/navbar'

const Router = (): React.ReactNode => {
    const renderComponent = (
        Component: React.ComponentType,
    ): React.ReactNode => {
        return <Component />
    }

    return (
        <HashRouter basename="/">
            <Navbar routes={routes} />
            <Routes>
                {routes.map(({ path, component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={renderComponent(
                            component as React.ComponentType,
                        )}
                    />
                ))}
            </Routes>
        </HashRouter>
    )
}

export default Router
