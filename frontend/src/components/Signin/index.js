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

const SignIn = () => {
    return(
        <>
            <Container>
                <SignInWrap>
                    <NavLink to="/">Hardware-as-a-Service</NavLink>
                    <SignInContent>
                        <SignInForm action="#">
                            <SignInH1>Sign Up</SignInH1>
                            <SignInLabel>Email</SignInLabel>
                            <SignInInput type="email" required />
                            <SignInLabel>Password</SignInLabel>
                            <SignInInput type="password" required />
                            <SignInButton type="submit">Sign Up</SignInButton>
                            <Text>Don't have an account? <a href ="/signup">Sign up</a></Text>
                        </SignInForm>
                    </SignInContent>
                </SignInWrap>
            </Container>
        </>
    )
}

export default SignIn