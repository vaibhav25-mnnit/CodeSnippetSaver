import Editor from "@monaco-editor/react";
import { useState } from "react";

import axios from "axios";

import '../styles/Coderunner.css'

function Coderunner({ mainCode, lang }) {

    const [code, setCode] = useState(mainCode);
    const [input, setInput] = useState("");
    const [ans, setAns] = useState("");
    const [time, setTime] = useState("");
    const [memory, setMemory] = useState("");
    const [load, setLoad] = useState(false);

    console.log(lang);
    async function handleClick() {

        const data = {
            script: code,
            stdinput: input,
            language: lang
        }
        const URL = `${process.env.REACT_APP_backend_url}/run`

        try {
            setLoad(true);
            const res = await axios.post(URL, data)
            setAns(res.data.output)
            setTime(res.data.cpuTime)
            setMemory(res.data.memory)
            setLoad(false);
        } catch (error) {
            console.log(error)
        }
    }


    return (<>


        <div className="container" >
            {

                load ?
                    <button className="btn btn-dark" type="button" disabled>
                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true">  </span>
                        Running...
                    </button>
                    :
                    <button className="btn btn-dark" onClick={handleClick} type="button">
                        <i className="fa-solid fa-person-running" /> Run

                    </button>
            }

            <div style={{
                display: "flex",
                justifyContent: 'center',
                height: '80vh',
                marginTop: '10px'
            }}>
                <div
                    style={{
                        width: "100%"
                    }}
                >
                    <Editor
                        onChange={(e) => {
                            setCode(e);
                        }}
                        height="100%"
                        width="100%"
                        defaultLanguage={lang}
                        // defaultValue={code}
                        value={code}
                        options={{
                            scrollBeyondLastLine: false,
                        }}
                        theme="vs-dark"
                    // options={ }
                    />
                </div>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    width: '100vh',
                    margin: '10px'
                }}>
                    <>
                        <h5>Input:-</h5>
                        <Editor
                            disabled
                            height="100%"
                            width="100%"

                            onChange={(i) => { setInput(i) }}
                            options={{
                                lineNumbers: false,
                                scrollBeyondLastLine: false,
                            }}
                            theme="vs-dark"
                        />

                        <h5>OUTPUT:-</h5>
                        <Editor
                            disabled
                            height="100%"
                            width="100%"
                            value={ans}
                            options={{
                                lineNumbers: false,
                                scrollBeyondLastLine: false,
                                readOnly: true
                            }}
                            theme="vs-dark"
                        />


                        {memory &&
                            <div style={
                                {
                                    fontSize: 'auto',
                                    // border: '2px solid red',
                                    color: 'blue',
                                    display: 'flex',
                                    justifyContent: 'space-around',
                                    alignItems: 'center'
                                }
                            }>


                                <span> <i style={{ color: 'black' }} className="fa-regular fa-clock"></i> : {time}  sec(s)</span>
                                <span><i style={{ color: 'black' }} className="fa-solid fa-database"></i> : {memory}  kilobyte(s)</span>
                            </div>
                        }
                    </>

                </div>
            </div>

        </div>

    </>
    );
}

export default Coderunner;

