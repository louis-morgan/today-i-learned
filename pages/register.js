import { useState, useContext } from 'react'
import { AuthContext } from '../context/auth.js'
import isLoggedIn from '../utils/isLoggedIn'
import Link from 'next/link'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import Logo from '../components/Logo'
export default function Login({ initialError }) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [error, setError] = useState(
        initialError?.code == 'auth/argument-error' ? null : initialError
    )
    const { user, signUp } = useContext(AuthContext)

    return (
        <Container className="w-50 d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Form className="w-100" onSubmit={(e) => e.preventDefault()}>
                <Logo />
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        required
                        onChange={(e) => setPass(e.target.value)}
                        placeholder="Password"
                    />
                </Form.Group>
                {error && <Alert variant="danger">{error?.message}</Alert>}
                <Button
                    block
                    variant="primary"
                    type="submit"
                    disabled={email === '' || pass === ''}
                    onClick={async () => {
                        try {
                            await signUp({ email, pass })
                        } catch (err) {
                            setError(err)
                        }
                    }}>
                    Create Account
                </Button>

                <Link href="/login" passHref>
                    <Button variant="link" size="sm" block className="text-center">
                        Login
                    </Button>
                </Link>
            </Form>
        </Container>
    )
}

// #DOING:15 ## check if logged in and redirect on load completed:2021-04-04T10:21:23.898Z

export async function getServerSideProps(context) {
    try {
        let uid = await isLoggedIn(context, true)
        context.res.writeHead(302, { location: '/feed' })
        context.res.end()
        return {
            props: {
                session: uid,
            },
        }
    } catch (err) {
        // token not provided to firebase
        return {
            props: {
                error: err,
            },
        }
    }
}
