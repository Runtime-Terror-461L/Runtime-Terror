 import {
    Container,
    SignInWrap,
    NavLink,
    SignInContent,
    SignInForm,
    SignInH1,
    SignInLabel,
    SignInInput,
    SignInButton,
    Text
} from './styles'
import { useState } from 'react';
/* import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'

 */

function SignInUser(credentials){
    const body = JSON.stringify(credentials);
    return fetch("http://localhost:5000/signin", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': 'true',
            
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    }).then(data => data.json())
    
}

function Test(){
    const a = fetch("http://localhost:5000/test", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': 'true',

            
        },
        credentials: 'include'
    })
    console.log(a);

}

const SignIn = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [responseText, setResponseText] = useState();
    
    async function handleSubmit(){
        console.log("You are submitting");

        const credentials = {
            email,
            password
        }
        const fetchResponse = await SignInUser(credentials);
        if(fetchResponse.hasOwnProperty('message')){
            setResponseText(fetchResponse.message);
        }
        else if(fetchResponse.hasOwnProperty('error')){
            setResponseText(fetchResponse.error);
        }else if(fetchResponse.hasOwnProperty('email')){
            setResponseText(fetchResponse.email);
        }

        await Test();

        console.log(fetchResponse);


    }

    



/* 

    
    
    

    // click action for the login button
    async function handleSubmit(e) {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            history.push("/dashboard")
        } catch {
            setError('Failed to log in')
        }
        setLoading(false)

    } */
    return(
        <>
            <Container>
                <SignInWrap>
                    <NavLink to="/">Hardware-as-a-Service</NavLink>
                    <SignInContent>
                        <SignInForm action="#">
                            <SignInH1>Sign In</SignInH1>
                            <SignInLabel>Email</SignInLabel>
                            <SignInInput type="email" onChange={e => {setEmail(e.target.value); console.log(email)}} required />
                            <SignInLabel>Password</SignInLabel>
                            <SignInInput type="password" onChange={e => setPassword(e.target.value)}required />
                            <SignInButton type="button" onClick={() => {handleSubmit()}}>Sign In</SignInButton>
                            <Text>Need an account? <a href ="/signup">Sign up</a></Text>
                            <Text>{responseText}</Text>
                        </SignInForm>
                    </SignInContent>
                </SignInWrap>
            </Container>
        </>
    )
}

export default SignIn