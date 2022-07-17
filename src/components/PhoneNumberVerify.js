import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { Button, Form, InputGroup } from "react-bootstrap";

import "react-phone-number-input/style.css";
import OTPInput from "otp-input-react";

import { authentication } from "../firebase";
import {
    RecaptchaVerifier,
    signInWithPhoneNumber,
    browserLocalPersistence,
    setPersistence,
} from "firebase/auth";


export default function PhoneNumberVerify() {
    let [phoneNumber, setphoneNumber] = useState("");
    let navigate = useNavigate();
    const [sentOtp, setSentOtp] = useState(false);
    const [OTP, setOTP] = useState("");

    const prefix = '+91';
    const generateRecaptcha = () => {
        window.recaptchaVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
                size: "invisible",
                callback: (response) => { },
            },
            authentication
        );
    };

    const handleSubmitFrom = (event) => {
        event.preventDefault();
        phoneNumber = (prefix + phoneNumber);
        console.log(phoneNumber);

        if (phoneNumber === undefined || phoneNumber.length !== 13) {
            alert("Invalid Phone Number.\nPlease, Enter valid Phone number.");
            setSentOtp(false);
            return;
        } else {
            setSentOtp(true);
            generateRecaptcha();

            let appVerifier = window.recaptchaVerifier;

            setPersistence(authentication, browserLocalPersistence)
                .then(() => {
                    alert('OTP sent successfully');
                    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
                        .then((confirmationResult) => {
                            window.confirmationResult = confirmationResult;

                            return;
                        })
                        .catch((error) => {
                            alert("error whiling sending otp \n" + error);
                            console.log("error whiling sending otp \n" + error);
                            setSentOtp(false);
                            return;
                        });
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSubmitOtp = (event) => {
        event.preventDefault();
        if (OTP === "" || OTP === undefined || OTP.length !== 6) {
            alert("Please,Enter valid otp");
            console.log("Please, Enter valid otp");
            return;
        }
        // console.log(OTP);
        let confirmationResult = window.confirmationResult;
        confirmationResult
            .confirm(OTP)
            .then((result) => {
                console.log(result);
                navigate("/dashboard");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <>
            <div style={{
                borderBottom: '2px solid black',
                padding: '5px',
                display: 'flex',
                alignItems: 'center'
            }}>
                {!sentOtp ? (
                    <div
                        style={{
                            width: "100%",
                            display: 'flex',
                            flexDirection: 'column',
                        }}
                    >
                        <Form onSubmit={handleSubmitFrom}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <InputGroup size="lg">
                                    <InputGroup.Text id="inputGroup-sizing-lg">{prefix}</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        placeholder="Enter phone number"
                                        value={phoneNumber}
                                        autocomplete="off"
                                        su
                                        onChange={(e) => {
                                            setphoneNumber(e.target.value)
                                        }}
                                    />
                                </InputGroup>
                            </Form.Group>

                            <Form.Group className="mb-3" style={{
                                display: 'flex',
                                // alignItems: 'center',
                                flexDirection: 'column',
                                // border: '2px solid red'
                            }}>
                                <Button variant="outline-primary" size="lg" type=" submit" id="sign-in-button"
                                    style={{
                                        fontSize: 'larger'
                                    }}
                                >
                                    Send Otp
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                ) : (
                    <div
                        style={{
                            width: "100%%",
                        }}
                    >
                        <Form onSubmit={handleSubmitOtp} >
                            <Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>OTP</Form.Label>
                                    <OTPInput
                                        value={OTP}
                                        onChange={setOTP}
                                        OTPLength={6}
                                        otpType="number"
                                        disabled={false}
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit OTP
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                )}
                <div id="recaptcha-container"></div>
            </div>
        </>
    );
}
