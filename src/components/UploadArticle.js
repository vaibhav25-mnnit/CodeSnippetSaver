import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';

import Editor from "@monaco-editor/react";

import axios from 'axios';
import { Navigate, useParams } from 'react-router-dom';



export default function UploadArticle() {

    const param = useParams();

    const topicId = param.topicId;
    const [note, setNote] = useState("");
    const [code, setCode] = useState("");
    const [name, setName] = useState("");
    const [dificulty, setDificulty] = useState("");
    const [result, setResult] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isecret, setIsecret] = useState("");
    const secret = "tonystark"

    const handleChange3 = (event) => {
        setName(event.target.value);
    }
    const handleChange4 = (event) => {
        setNote(event.target.value);
    }
    const handleChange5 = (event) => {
        setDificulty(event.target.value);
    }

    const handleSubmit = (event) => {

        const data = {
            topicId: topicId,
            note: note,
            code: code,
            name: name,
            dificulty: dificulty
        }

        console.log(data);

        axios.post(`${process.env.REACT_APP_backend_url}/addarticle/`, data)
            .then(response => setResult(true))
            .catch(err => console.log(err))

        event.preventDefault();
    }
    return (
        <div>
            {result ? <Navigate to={`/topic/${topicId}`} /> :
                <div className='container'>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Topic Id</Form.Label>
                            <Form.Control disabled value={topicId} type="text" required placeholder="Enter Topic Id" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Name</Form.Label>
                            <Form.Control onChange={handleChange3} value={name} type="text" required placeholder="Enter Article Name" />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Code:</Form.Label>
                            <Editor
                                onChange={(e) => { setCode(e); }}
                                height="60vh"
                                width="100%"
                                defaultLanguage="cpp"
                                defaultValue={code}
                                options={{
                                    scrollBeyondLastLine: false,
                                }}
                                theme="vs-dark"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={handleChange4} value={note} >
                            <Form.Label>Enter note</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label> Dificulty Level</Form.Label>
                            <Form.Control onChange={handleChange5} value={dificulty} type="text" required placeholder="Enter Dificulty Level" />
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
