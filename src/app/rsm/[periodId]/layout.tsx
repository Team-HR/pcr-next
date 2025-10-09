import React from 'react'
import { RsmProvider } from '../context/RsmContext'
import { MfoEditModalProvider } from '../context/MfoEditModalContext'

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <RsmProvider>
            <MfoEditModalProvider>
                {children}
            </MfoEditModalProvider>
        </RsmProvider>
    )
}

export default layout