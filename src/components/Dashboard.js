import React, { useEffect, useState } from 'react';
import axios from 'axios'


import Nav from './Nav'
import Topic from './Topic'
import Spinar from './Spinar';

import { selectIsUser } from '../features/userSlice'
import { useSelector } from "react-redux";
import { Button, Form, InputGroup } from 'react-bootstrap';
import { authentication } from '../firebase';

import { Link } from 'react-router-dom';


export default function Dashboard() {
    const isUser = useSelector(selectIsUser);

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(null);
    const [topic, setTopic] = useState("");

    const [flag, setFlag] = useState(false);


    const user = authentication.currentUser;
    useEffect(() => {
        if (user) fetchData(user.phoneNumber);
    }, [user, flag])

    async function fetchData(number) {

        try {
            const response = await axios.get(`${process.env.REACT_APP_backend_url}/user/${number}`)
            const data = await response.data;
            setResult(data);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('adding the topic..')
        const data = {
            name: topic,
            user: authentication.currentUser.phoneNumber
        }

        axios.post(`${process.env.REACT_APP_backend_url}/addtopic/`, data)
            .then((response) => {
                setTopic("");
                setFlag(~flag);
            })
            .catch(err => console.log(err))

    }

    return (

        <>
            {
                !isUser ?
                    <>
                        <div className='d-flex justify-content-center'>
                            <h2>Please , <Link to='/'>Log In</Link>  </h2>
                        </div>

                    </>
                    :
                    <>
                        {loading ?
                            <div>

                                <Nav></Nav>
                                <div style={{
                                    justifyContent: 'center',
                                    display: 'flex',
                                }}>
                                    <Form onSubmit={handleSubmit} style={{

                                    }}>
                                        <InputGroup className="mb-3" size="lg">
                                            <Form.Control
                                                placeholder="Add new Idea"
                                                value={topic}
                                                onChange={(e) => {
                                                    setTopic(e.target.value);
                                                }}
                                                required={true}
                                            />
                                            <Button variant="primary" type='submit'>
                                                Add
                                            </Button>
                                        </InputGroup>
                                    </Form>
                                </div>
                                <hr />
                                <div className="container">
                                    <div className="row">
                                        {result.map((res) => <Topic
                                            flag={flag}
                                            setFlag={setFlag}
                                            key={res._id}
                                            name={res.name}
                                            code={res._id}>
                                        </Topic>)
                                        }
                                    </div>
                                </div>
                            </div> : <Spinar />
                        }</>
            }
        </>
    )
}
