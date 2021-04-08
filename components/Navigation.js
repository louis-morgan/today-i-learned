import { Navbar, Nav, NavDropdown, Button, Container } from 'react-bootstrap'
import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../context/auth.js'
import router from 'next/router'
import Logo from './Logo'
export default function Navigation(props) {
    const { user, signOut } = useContext(AuthContext)
    return (
        <Navbar bg="light" expand="lg">
            <Container className="d-flex justify-content-between">
                <Link href="/" passHref>
                    <Nav.Link className="pl-0">
                        <Logo className="mb-0" />
                    </Nav.Link>
                </Link>

                <div>
                    {user && (
                        <>
                            <Link href="/profile" passHref>
                                <Nav.Link className="d-inline-block">Profile</Nav.Link>
                            </Link>
                            <Button
                                variant="primary"
                                onClick={async () => {
                                    let res = await signOut()
                                    console.log(res)
                                }}>
                                Log Out
                            </Button>
                        </>
                    )}
                    {!user && (
                        <>
                            <Link href="/login" passHref>
                                <Nav.Link className="d-inline-block">Login</Nav.Link>
                            </Link>
                            <Link href="/register" passHref>
                                <Button variant="primary">Join free</Button>
                            </Link>
                        </>
                    )}
                </div>
            </Container>
        </Navbar>
    )
}
