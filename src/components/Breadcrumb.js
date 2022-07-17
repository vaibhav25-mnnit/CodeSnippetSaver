import React from 'react'

import '../styles/Nav.css'

import { Link, useNavigate } from 'react-router-dom'

import { Button } from 'react-bootstrap'
import { signOutUser } from '../features/userSlice'
import { useDispatch } from "react-redux";
import { authentication } from '../firebase';
import { signOut } from "firebase/auth";


function Breadcrumb({ name, topicId }) {

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

    return (
        <>
            <nav className="bread d-flex align-items-center navbar-dark bg-dark sticky-top ">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to='/dashboard'>Topics</Link>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">{name}</li>
                    </ol>
                </nav>

                <div >
                    <Button onClick={logOut} variant="danger" > Log out</Button>
                </div>
            </nav>
        </>
    )
}

export default Breadcrumb
