import React, { useState } from 'react'

import { Form, Button } from 'react-bootstrap';

import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default function UploadTopic() {
    const [name, setName] = useState("");
    const [img, setImg] = useState("");
    const [result, setResult] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isecret, setIsecret] = useState("");
    const secret = "tonystark"

    const handleChange1 = (event) => {
        setName(event.target.value);
    }
    const handleChange2 = (event) => {
        setImg(event.target.value);
    }

    const handleSubmit = (event) => {


        const data = {
            name: name,
            imgUrl: img
        }

        axios.post(`${process.env.REACT_APP_backend_url}/addtopic/`, data)
            .then(response => setResult(true))
            .catch(err => console.log(err))

        event.preventDefault();
    }
    return (
        <div>
            {result ? <Navigate to='/' /> :
                <div className='container'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange1} value={name} type="text" required placeholder="Enter Topic Name" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label >Image Url</Form.Label>
                            <Form.Control onChange={handleChange2} value={img} type="text" required placeholder="Enter image Url" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label >Secret Key</Form.Label>
                            <Form.Control onChange={(e) => {
                                setIsecret(e.target.value)
                                console.log(e.target.value, " ", secret)
                                if (secret === e.target.value) {
                                    // console.log("seting true")
                                    setIsValid(true)
                                }
                            }} value={isecret} type="password" required placeholder="Enter a Secret key to add topic" />
                        </Form.Group>
                        <Button variant="primary" disabled={isValid ? false : true} type="submit">
                            Submit
                        </Button>
                    </Form>

                </div>
            }
        </div>
    )
}
