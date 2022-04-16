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
    if(credentials.email == "" || credentials.name == "" || credentials.password == ""){
        console.log("You haven't completed the required fields, no login");
        return {
            error: "You haven't completed the required fields, please complete all fields to sign up"
        }
    }
    const body = JSON.stringify(credentials);
    console.log("This is the body");
    console.log(body)
    return fetch("/signup", {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin':'*'
        },
        body: JSON.stringify(credentials),
    }).then(data => data.json())
    
}

const SignUp = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

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
            alert("You have successfully signed up with email: "+fetchResponse.email);
        }
        else if(fetchResponse.hasOwnProperty('error')){
            alert(fetchResponse.error);
        }
        console.log(fetchResponse);


    }

    return(
        <>
            <Container style={{overflow:'auto'}}>
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
                        </SignUpForm>
                    </SignUpContent>
                </SignUpWrap>
            </Container>
        </>
    )
}

export default SignUp