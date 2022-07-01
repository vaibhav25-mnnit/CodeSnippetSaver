import React, { useState } from "react";

import '../styles/CreateSnippet.css'


import axios from 'axios';

import Editor from "@monaco-editor/react";

import { Button, Form } from "react-bootstrap";
function CreateSnippet({ topic }) {
    const [title, setTitle] = useState("");
    const [code, setCode] = useState("");
    const [flag, setFlag] = useState(false);
    const [lang, setLang] = useState("cpp");
    const [note, setNote] = useState("");
    const [dificulty, setDifficulty] = useState("Easy");

    const handleForm = async (event) => {
        event.preventDefault();
        const data = {
            note: note,
            code: code,
            title: title,
            dificulty: dificulty,
            language: lang,
            topicId: topic,
        }
        console.log(data);

        axios.post(`${process.env.REACT_APP_backend_url}/addarticle/`, data)
            .then(response => console.log(response))
            .catch(err => console.log(err))

        setTitle("");
        setCode("");
        setNote("");
        setFlag(false);
    };
    return (
        <div
            onClick={(e) => {
                if (e.target.className === "") setFlag(false);
                else setFlag(true);

            }}
        >
            <form
                className="form"
                onSubmit={handleForm}
            >
                <Form.Group className="mb-3">
                    {flag && <Form.Label>Title:</Form.Label>}
                    <Form.Control type="text" onChange={(e) => {
                        setTitle(e.target.value);
                    }}
                        value={title}
                        placeholder={flag ? "Title" : "Add a snippet.."}
                        onClick={() => {
                            setFlag(true);
                        }}
                        required={true}
                    >
                    </Form.Control >
                </Form.Group>
                {flag && (
                    <>


                        <Form.Group className="mb-3">
                            <Form.Label>Language:</Form.Label>
                            <Form.Select onClick={(e) => {
                                setLang(e.target.value);
                            }} >
                                <option>cpp</option>
                                <option>java</option>
                                <option>javascript</option>
                                <option>python</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Code:</Form.Label>
                            <Editor
                                onChange={(e) => {
                                    setCode(e);
                                }}

                                key={lang}
                                height="60vh"
                                width="100%"
                                defaultLanguage={lang}
                                defaultValue={code}
                                options={{
                                    scrollBeyondLastLine: false,
                                }}
                                theme="vs-dark"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setNote(e.target.value)} value={note}
                            required={true}
                        >
                            <Form.Label>Note:</Form.Label>
                            <Form.Control as="textarea" rows={3} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Dificulty</Form.Label>
                            <Form.Select onClick={(e) => {
                                setDifficulty(e.target.value);
                            }} >
                                <option>Easy</option>
                                <option>Medium</option>
                                <option>Hard</option>
                            </Form.Select>
                        </Form.Group>

                        <hr />

                        <div type="submit" className="d-grid gap-2">
                            <Button type="submit" variant="outline-success" size="lg"
                                style={{
                                    fontSize: '20px'
                                }}
                            >
                                Add
                            </Button>
                        </div>
                    </>
                )}
            </form>
            <br />
        </div >
    );
}


export default CreateSnippet;







