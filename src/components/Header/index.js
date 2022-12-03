import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';

export default function() {
    return (
        <>
            <div className='header'>
                <div id='infodex-title'>
                    InfoDex
                </div>
                <div className='opts-container'>
                    <Link to='/' className='option'>
                        Home
                    </Link>
                    <Link to='/browse' className='option'>
                        Browse
                    </Link>
                    <div className='option'>
                        About
                    </div>
                    <div className='option'>
                        Login
                    </div>
                </div>
            </div>
        </>
    )
}