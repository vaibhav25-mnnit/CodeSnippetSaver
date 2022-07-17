import React, { useState } from 'react';

import PhoneNumberVerify from './PhoneNumberVerify';
import '../styles/Home.css'
import imgSrc from '../assets/images/laptop.jpg'
import { Button, Offcanvas } from 'react-bootstrap';


import { selectIsUser } from '../features/userSlice'
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Home() {


    const isUser = useSelector(selectIsUser);

    let navigate = useNavigate();
    const [show, setShow] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return <>

        {
            isUser ? <>
                {navigate('/dashboard')}
            </> : <>

                <Offcanvas show={show} onHide={handleClose}
                    scroll='false'
                    backdrop='false'
                    placement='end'

                    style={{
                        backgroundImage: `url("https://www.transparenttextures.com/patterns/arabesque.png")`
                    }}
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>
                            Log in
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body >
                        <PhoneNumberVerify />
                    </Offcanvas.Body>
                </Offcanvas>


                <div style={
                    {
                        height: '100vh',
                        backgroundImage: `url(${imgSrc})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        filter: 'blur(2px)',
                    }
                }>
                </div>

                <div className='logIn'>
                    <Button onClick={handleShow} style={{
                        width: '100px',
                        // fontSize: '10px'
                    }} variant='primary'>Login</Button>
                </div>
                <div>
                    <div className="bg-text">
                        <h1 style={{
                            fontSize: '50px'
                        }}>WelCome to Snippet Saver</h1>
                    </div>

                </div>
            </>
        }


    </>
}

export default Home
