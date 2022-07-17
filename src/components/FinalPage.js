import '../styles/FinalPage.css';

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, Link } from 'react-router-dom'
import { BrowserView } from 'react-device-detect';


import Coderunner from './Coderunner';

import Editor from "@monaco-editor/react";

import '../styles/Nav.css'

import Spinar from './Spinar'



import { selectIsUser } from '../features/userSlice'
import { useSelector } from "react-redux";
function FinalPage() {

    const isUser = useSelector(selectIsUser);

    const param = useParams();
    const id = param.articleId;
    const parent = param.parent;
    const parentName = param.name;

    const [note, setNote] = useState("")
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [edit, setEdit] = useState(false)
    const [lang, setLang] = useState("");
    const [loading, setLoading] = useState(null);

    // const deleteUrl = `http://localhost/delete/article/${id}/`

    useEffect(() => {
        fetchData();
        async function fetchData() {
            try {
                const response = await axios.get(`${process.env.REACT_APP_backend_url}/article/${id}/parent/${parent}`);
                const data = await response.data;
                const { note, code, title, language
                } = data;
                setCode(code)
                setName(title)
                setNote(note)
                setLang(language);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }
        }
    })

    return (

        <>
            {!isUser ? <>
                <div className='d-flex justify-content-center'>
                    <h2>Please , <Link to='/'>Log In</Link>  </h2>
                </div>
            </> : <>
                {
                    loading ?
                        <div>
                            {
                                !edit
                                    ?
                                    <div>
                                        <nav className="bread  navbar-dark bg-dark sticky-top ">
                                            <nav aria-label="breadcrumb">
                                                <ol className="breadcrumb">
                                                    <li className="breadcrumb-item"><Link to='/dashboard'>Topics</Link>
                                                    </li>
                                                    <li className="breadcrumb-item"><Link to={`/topic/${parent}`}>{parentName}</Link>
                                                    </li>
                                                    <li className="breadcrumb-item active" aria-current="page">{name}</li>
                                                </ol>
                                            </nav>
                                        </nav>

                                        <div className='d-flex justify-content center'>
                                            <h1 style={{
                                                'borderBottom': '2px solid black'
                                            }}>{name}</h1>
                                        </div>
                                        <hr />

                                        {
                                            note && <div style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                flexDirection: 'column'

                                            }}>
                                                <h4>Notes:</h4>
                                                <textarea rows={10}
                                                    defaultValue={note} style={{
                                                        caretColor: 'transparent',
                                                        width: "75%",
                                                        background: '#282a2b',
                                                        color: '#d1d1d1'

                                                    }} />
                                            </div>
                                        }
                                        <hr />

                                        <div className='d-flex justify-content center'>
                                            <h2 style={{
                                                'borderBottom': '2px solid black'
                                            }}>
                                                Code:
                                            </h2></div>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            msFlexDirection: 'row'
                                        }}>
                                            <BrowserView >
                                                <h4 >
                                                    <i
                                                        onClick={() => setEdit(!edit)}
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '100px',
                                                            fontSize: '21px',
                                                        }}
                                                        className={"fa-regular fa-pen-to-square edit "}>
                                                    </i>
                                                </h4>
                                            </BrowserView>
                                            <Editor
                                                onChange={(e) => { setCode(e); }}
                                                height="80vh"
                                                width="75%"
                                                defaultLanguage={lang}
                                                defaultValue={code}
                                                options={{
                                                    scrollBeyondLastLine: false,
                                                    readOnly: true
                                                }}
                                                theme="vs-dark"
                                            />
                                        </div>
                                    </div>
                                    :
                                    <div>
                                        <h1>
                                            <i
                                                onClick={() => setEdit(!edit)}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '100px',
                                                    fontSize: '21px',
                                                }} className="fa-solid fa-backward edit"></i>
                                        </h1>
                                        <Coderunner mainCode={code}
                                            lang={lang}
                                        />
                                    </div>
                            }
                            <hr />

                        </div>

                        :
                        <Spinar />
                }
            </>}
        </>
    )
}

export default FinalPage
