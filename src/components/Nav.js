import React, { useState } from 'react'
import '../styles/Nav.css'
import { Button, Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { selectIsUser, signOutUser } from '../features/userSlice'
import { useSelector, useDispatch } from "react-redux";
import { authentication } from '../firebase';
import { signOut } from "firebase/auth";

import PhoneNumberVerify from './PhoneNumberVerify';


function Nav() {

    const dispatch = useDispatch();
    const isUser = useSelector(selectIsUser);
    const navigate = useNavigate();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logOut = () => {
        if (!window.confirm("Do you really want to log out?")) return;
        signOut(authentication)
            .then(() => {
                dispatch(signOutUser());
                alert("signed out successfully..");
                console.log("signed out successfully..");
                navigate("/");
            })
            .catch((error) => {
                alert(error);
            });
    }


    return (<>
        {/* otp verification  */}

        <Offcanvas show={show} onHide={handleClose}
            scroll='false'
            backdrop='false'
            placement='end'
        >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Log in</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <PhoneNumberVerify />
            </Offcanvas.Body>
        </Offcanvas>

        <nav className="navbar navbar-dark bg-dark sticky-top ">
            <div className="container-fluid d-flex justify-content-evenly align-items-center">
                <h1 className="navbar-brand brand">
                    My Ds Algo Collection
                </h1>

                <div style={{
                    'position': 'absolute',
                    'top': '0',
                    'right': '0'
                }}>

                    {
                        isUser ? <>
                            <Button onClick={logOut} variant="danger" > Log out</Button>
                        </> : <>
                            <Button variant="primary" onClick={handleShow}>Log In</Button>
                        </>
                    }
                </div>

            </div>

        </nav >
    </>
    )
}

export default Nav;
