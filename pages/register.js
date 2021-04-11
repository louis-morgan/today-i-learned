import { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/auth.js'
import isLoggedIn from '../utils/isLoggedIn'
import Link from 'next/link'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import Logo from '../components/Logo'
export default function Register({ initialError }) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [username, setUsername] = useState('')
    const [error, setError] = useState(
        initialError?.code == 'auth/argument-error' ? null : initialError
    )
    // /^[a-z0-9]{MIN_CHARS,MAX_CHARS}$/i
    const { user, signUp } = useContext(AuthContext)

    return (
        <Container className="w-50 d-flex flex-column min-vh-100 justify-content-center align-items-center">
            <Form className="w-100" onSubmit={(e) => e.preventDefault()}>
                <Logo />
                <Form.Group controlId="formBasicUsername">
                    <Form.Control
                        type="username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        isValid={/^[a-z0-9]{5,20}$/i.test(username)}
                    />
                    <Form.Text className="text-muted">
                        Only contain alphanumeric characters (numbers and letters) allowed
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Control
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email"
                        isValid={email.includes('@')}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Control
                        type="password"
                        required
                        onChange={(e) => setPass(e.target.value)}
                        isValid={pass.length >= 6}
                        placeholder="Password"
                    />
                    <Form.Text className="text-muted">Minimum of 6 characters</Form.Text>
                </Form.Group>
                {error && <Alert variant="danger">{error?.message}</Alert>}
                <Button
                    block
                    variant="primary"
                    type="submit"
                    disabled={email === '' || pass === ''}
                    onClick={async () => {
                        try {
                            await signUp({ email, pass, username })
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
    const { uid } = await isLoggedIn(context)
    if (uid) {
        context.res.writeHead(302, { location: '/feed' })
        context.res.end()
    } else {
        return {
            props: {},
        }
    }
}
