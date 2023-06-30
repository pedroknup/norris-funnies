import React, { type PropsWithChildren } from 'react'

export const AnimatedList: React.FC = ({ children }: PropsWithChildren) => (
    <div data-testid="mock-animated-list">{children}</div>
)
