import Header from '../components/header'
import React from 'react'
import { Outlet } from 'react-router-dom'

export default () => {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
