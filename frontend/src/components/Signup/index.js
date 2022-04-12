import {
    Container,
    SignUpWrap,
    NavLink,
    SignUpContent,
    SignUpForm,
    SignUpH1,
    SignUpLabel,
    SignUpInput,
    SignUpButton,
    Text
} from './styles'
import { useState } from 'react';

function SignUpUser(credentials){
    const body = JSON.stringify(credentials);
    return fetch("http://localhost:5000/signup", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json())
    
}

const SignUp = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [responseText, setResponseText] = useState();
    const [name, setName] = useState();

    async function handleSubmit(){
        console.log("You are submitting");
        console.log(name);
        

        const credentials = {
            email,
            password,
            name,
        }

        console.log(credentials);

        const fetchResponse = await SignUpUser(credentials);
        if(fetchResponse.hasOwnProperty('email')){
            setResponseText(fetchResponse.email);
        }
        else if(fetchResponse.hasOwnProperty('error')){
            setResponseText(fetchResponse.error);
        }
        console.log(fetchResponse);


    }

    return(
        <>
            <Container>
                <SignUpWrap>
                    <NavLink to="/">Hardware-as-a-Service</NavLink>
                    <SignUpContent>
                        <SignUpForm action="#">
                            <SignUpH1>Sign Up</SignUpH1>
                            <SignUpLabel>Full Name</SignUpLabel>
                            <SignUpInput type="name" onChange={e => setName(e.target.value)} required />
                            <SignUpLabel>Email</SignUpLabel>
                            <SignUpInput type="email" onChange={e => setEmail(e.target.value)} required />
                            <SignUpLabel>Password</SignUpLabel>
                            <SignUpInput type="password" onChange={e => setPassword(e.target.value)} required />
                            <SignUpButton type="button" onClick={() => {handleSubmit()}}>Sign Up</SignUpButton>
                            <Text>Already have an account? <a href ="/signin">Sign in</a></Text>
                            <Text>{responseText}</Text>
                        </SignUpForm>
                    </SignUpContent>
                </SignUpWrap>
            </Container>
        </>
    )
}

export default SignUp