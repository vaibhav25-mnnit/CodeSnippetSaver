import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Nav.css'

import { Button } from 'react-bootstrap'


import axios from 'axios';




export default function Articlebutton({ name, parent, dificulty, id, parentName }) {

    const navigate = useNavigate();

    let buttonColor = 'success';
    if (dificulty === 'Medium')
        buttonColor = 'warning'
    else if (dificulty === 'Hard')
        buttonColor = 'danger'

    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        console.log('delete')

        deleteTopic();

    }

    async function deleteTopic() {

        try {
            const response = await axios.get(`${process.env.REACT_APP_backend_url}/delete/article/${id}/${parent}`)
            const data = await response.data;
            console.log(data);
            navigate(`/topic/${parent}`)
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className='col-lg-3 col-md-4 d-flex justify-content-center ' style={
                {
                    'margin': "5px 0",
                }
            }>
                <div>

                    <Link to={`/article/${id}/parent/${parent}/name/${parentName}`}
                        style={{
                            textDecoration: 'none'
                        }}
                    >
                        <Button className='card2' variant={buttonColor} type="submit" size="lg" style={{ 'width': '100%' }}>
                            <h5 className="card-title ">{name}</h5>
                            <small>{dificulty}</small>
                        </Button>
                    </Link>

                </div>
                <div>
                    <Button variant='outline-danger' onClick={handleDelete}>Delete</Button>
                </div>

            </div >
        </>
    )
}
