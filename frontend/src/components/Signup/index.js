import {
    Container,
    FormWrap,
    NavLink,
    FormContent,
    Form,
    FormH1,
    FormLabel,
    FormInput,
    FormButton,
    Text
} from './styles'

const SignUp = () => {
    return(
        <>
            <Container>
                <FormWrap>
                    <NavLink to="/">Hardware-as-a-Service</NavLink>
                    <FormContent>
                        <Form action="#">
                            <FormH1>Sign Up</FormH1>
                            <FormLabel>Full Name</FormLabel>
                            <FormInput type="name" required />
                            <FormLabel>Email</FormLabel>
                            <FormInput type="email" required />
                            <FormLabel>Password</FormLabel>
                            <FormInput type="password" required />
                            <FormButton type="submit">Sign Up</FormButton>
                            <Text>Already have an account? <a href ="/signup">Sign in</a></Text>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

export default SignUp