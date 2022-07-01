import React from 'react'

import { Spinner } from 'react-bootstrap'

export default function Spinar() {
    return (
        <div style={{ 'display': 'flex', "justifyContent": 'center', 'alignItems': 'center' }}>
            <Spinner animation="grow" size="sm" />
            <Spinner animation="grow" />
        </div>
    )
}
