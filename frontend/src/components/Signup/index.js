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

const SignUp = () => {
    return(
        <>
            <Container style={{overflow:'auto'}}>
                <SignUpWrap>
                    <NavLink to="/">Hardware-as-a-Service</NavLink>
                    <SignUpContent>
                        <SignUpForm action="#">
                            <SignUpH1>Sign Up</SignUpH1>
                            <SignUpLabel>Full Name</SignUpLabel>
                            <SignUpInput type="name" required />
                            <SignUpLabel>Email</SignUpLabel>
                            <SignUpInput type="email" required />
                            <SignUpLabel>Password</SignUpLabel>
                            <SignUpInput type="password" required />
                            <SignUpButton type="submit">Sign Up</SignUpButton>
                            <Text>Already have an account? <a href ="/signin">Sign in</a></Text>
                        </SignUpForm>
                    </SignUpContent>
                </SignUpWrap>
            </Container>
        </>
    )
}

export default SignUp