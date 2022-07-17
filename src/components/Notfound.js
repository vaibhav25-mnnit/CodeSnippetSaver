import React from 'react'

import { Link } from 'react-router-dom'

export default function Notfound() {
    return (
        <div className='d-flex justify-content-center' >
            <h2>Invalid Route ☹ <br></br>  Please,<Link to='/'>Log In</Link></h2>
        </div>
    )
}
