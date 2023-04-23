import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import './Root.css';
import via from '../../assets/VIA-logo.png'

export default function Root() {
    return (
        <>
            <div className='header'>
                <div className='item-1'>
                    <img src={via} alt='VIA University Logo'/>
                </div>
                <div className='item-2'>
                    PokéDex
                </div>
                <nav className='item-3'>
                    <Link to="/">Pokedex</Link>
                    <Link to="about">About</Link>
                </nav>   
            </div>
            <Outlet />
        </>
    )
}