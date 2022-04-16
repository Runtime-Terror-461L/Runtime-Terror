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
    if(credentials.email == "" || credentials.password == ""){
        return {
            error: "You haven't completed the required fields, please complete all fields to sign in"
        }
    }
    const body = JSON.stringify(credentials);

    return fetch("/signin", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',            
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    }).then(data => data.json())
    
}

function Test(){
    const a = fetch("/test", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*',            
        },
        credentials: 'include'
    })
    console.log(a);

}

const SignIn = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    async function handleSubmit(){
        console.log("You are submitting");

        const credentials = {
            email,
            password
        }
        const fetchResponse = await SignInUser(credentials);

        if(fetchResponse.hasOwnProperty('error')){
            alert(fetchResponse.error);
        }else if(fetchResponse.hasOwnProperty('email')){
            alert(fetchResponse.email);
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
            <Container style={{overflow:'auto'}}>
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
                        </SignInForm>
                    </SignInContent>
                </SignInWrap>
            </Container>
        </>
    )
}

export default SignIn