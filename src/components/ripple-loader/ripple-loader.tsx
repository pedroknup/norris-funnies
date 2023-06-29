import React from 'react'
import './ripple-loader.scss'

interface SpinnerProps {
    isLoading?: boolean
}

function RippleLoader({ isLoading }: SpinnerProps): React.ReactNode {
    return (
        <div className={`ripple ${isLoading ? 'show' : ''}`}>
            <div />
            <div />
        </div>
    )
}

export default RippleLoader
