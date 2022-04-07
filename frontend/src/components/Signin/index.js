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
/* import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'
import { Container } from 'react-bootstrap'

 */

const SignIn = () => {


/* 
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState('')
    const history = useHistory()

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
                            <SignInInput type="email" required />
                            <SignInLabel>Password</SignInLabel>
                            <SignInInput type="password" required />
                            <SignInButton type="submit">Sign In</SignInButton>
                            <Text>Need an account? <a href ="/signup">Sign up</a></Text>
                        </SignInForm>
                    </SignInContent>
                </SignInWrap>
            </Container>
        </>
    )
}

export default SignIn