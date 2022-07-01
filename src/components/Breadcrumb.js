import React from 'react'

import '../styles/Nav.css'


import { Link } from 'react-router-dom'

function Breadcrumb({ name, topicId }) {


    return (
        <>
            <nav className="bread  navbar-dark bg-dark sticky-top ">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/dashboard'>Topics</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{name}</li>
                    </ol>

                </nav>
            </nav>
        </>
    )
}

export default Breadcrumb
