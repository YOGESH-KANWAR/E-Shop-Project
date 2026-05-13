import React from 'react'
import { Outlet } from "react-router-dom";
export default function adminLayout() {
    return (
        <>
            <body>
                <nav className='h-25 bg-secondary'>
                    <h3>Admin layout</h3>
                </nav>
                <main>
                    <Outlet />
                </main>
            </body>
        </>
    )
}
