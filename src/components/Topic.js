import React from 'react'
import '../styles/Nav.css'

import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

import axios from 'axios'

function Topic({ flag, setFlag, imgURL, name, code }) {

    const navigate = useNavigate();


    const handleDelete = () => {
        if (!window.confirm("Are you sure you want to delete?")) return;

        console.log('delete')

        deleteTopic(code);

        setFlag(~flag);
    }

    async function deleteTopic(id) {

        try {
            const response = await axios.get(`${process.env.REACT_APP_backend_url}/deleteTopic/${id}`)
            const data = await response.data;
            console.log(data);
            navigate(`/dashboard`);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="col">

            <div className="card" style={{ "width": "18rem" }} >
                <img src={imgURL} className="card-img-top" alt="img" />
                <hr />
                <div className="card-body" style={{
                    'display': 'flex',
                    'flexDirection': 'column',
                    'justifyContent': 'center',
                }}>

                    <p
                        className="card-text" style={{ 'width': '100%' }}>
                        <Link role="button" aria-disabled="true" className="btn btn-primary btn-lg" to={`/topic/${code}`}>{name}</Link>
                    </p>
                    <Button onClick={handleDelete} variant='danger'>
                        Delete
                    </Button>
                </div>
            </div>
        </div >
    )
}

export default Topic
