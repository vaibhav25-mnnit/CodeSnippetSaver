import React from 'react'
import '../styles/Nav.css'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

import { signOutUser } from '../features/userSlice'
import { useDispatch } from "react-redux";
import { authentication } from '../firebase';
import { signOut } from "firebase/auth";

import icon from '../assets/images/icon.png'



function Nav() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logOut = () => {
        if (!window.confirm("Do you really want to log out?")) return;
        signOut(authentication)
            .then(() => {
                dispatch(signOutUser());
                console.log("signed out successfully..");
                navigate("/");
            })
            .catch((error) => {
                alert(error);
            });
    }


    return (<>

        <nav className="navbar navbar-dark bg-dark sticky-top ">
            <div className="container-fluid d-flex justify-content-space-between align-items-center">
                <div className=" d-flex align-items-center">
                    <h1 className="navbar-brand brand">
                        <img
                            alt=""
                            src={icon}
                            width="30"
                            height="30"
                        />{' '}
                        Snippet Saver
                    </h1>
                </div>
                <div >
                    <Button onClick={logOut} variant="danger" > Log out</Button>
                </div>
            </div>
        </nav >
    </>
    )
}

export default Nav;
