import React from 'react'
import { Partycles } from './pages/Partycles'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ParticleBlobPage } from './pages/ParticleBlobPage'

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Partycles />,
        },
        {
            path: '/blob',
            element: <ParticleBlobPage />,
        },
    ])
    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}

export default App
