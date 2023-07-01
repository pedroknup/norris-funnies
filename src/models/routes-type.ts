import type React from 'react'

export default interface IRoutes {
    path: string
    label: string
    component?: () => React.ReactNode
}
