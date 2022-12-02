import React from 'react';
import './header.css';

export default function() {
    return (
        <>
            <div className='header'>
                <div id='infodex-title'>
                    InfoDex
                </div>
                <div className='opts-container'>
                    <div className='option'>
                        Browse
                    </div>
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