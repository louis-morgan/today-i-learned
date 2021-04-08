import { useContext, useEffect, useState } from 'react'
import isLoggedIn from '../../../utils/isLoggedIn'
import { getUserWithId } from '@api/users/[id]'
import Head from 'next/head'
import { Container, Row, Col, Tab, Nav, Card, Form, InputGroup, Button } from 'react-bootstrap'
import { AuthContext } from '../../../context/auth'
import { SocialIcon } from 'react-social-icons'

export default function Edit({ userInfo }) {
    const { updateUser } = useContext(AuthContext)
    const [newUser, setNewUser] = useState(userInfo)
    const [loading, setLoading] = useState(false)

    const [displayName, setDisplayName] = useState(newUser?.displayName || '')
    const [twitter, setTwitter] = useState(newUser?.socials.twitter || '')
    const [devto, setDevto] = useState(newUser?.socials.devto || '')
    const [youtube, setYoutube] = useState(newUser?.socials.youtube || '')
    const [medium, setMedium] = useState(newUser?.socials.medium || '')
    const [linkedIn, setlinkedIn] = useState(newUser?.socials.linkedIn || '')
    const [github, setGithub] = useState(newUser?.socials.github || '')

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        let obj = {
            _id: newUser._id,
            displayName,
            socials: {
                twitter,
                devto,
                youtube,
                medium,
                linkedIn,
                github,
            },
        }
        // console.log(obj._id)
        // console.log(newUser.socials.devto)
        const response = await updateUser(obj)
        setNewUser(obj)
        setLoading(false)
        // console.log(response)
    }
    return (
        <>
            <Head>
                <title key="title">Edit Profile</title>
            </Head>
            <main>
                <Container className="mt-5">
                    <Tab.Container defaultActiveKey="first">
                        <Row>
                            <Col sm={12} md={3}>
                                <Card>
                                    <Card.Body>
                                        <Nav variant="pills" className="flex-column">
                                            <Nav.Item>
                                                <Nav.Link eventKey="first">Profile</Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="second">Account</Nav.Link>
                                            </Nav.Item>
                                        </Nav>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col sm={12} md={9}>
                                <Card>
                                    <Tab.Content>
                                        <Tab.Pane eventKey="first">
                                            <Card.Body className="border-bottom">
                                                <h2 className="text-muted mb-0">Edit Profile</h2>
                                                <p className="text-muted  mb-0">{newUser.email}</p>
                                            </Card.Body>
                                            <Card.Body>
                                                <Form onSubmit={(e) => handleSubmit(e)}>
                                                    <Form.Group>
                                                        <Form.Label>Display Name</Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            name="displayname"
                                                            value={displayName || ''}
                                                            placeholder={displayName || ''}
                                                            onChange={(e) => {
                                                                setDisplayName(e.target.value)
                                                            }}
                                                        />
                                                    </Form.Group>
                                                    <h3 className="text-muted">Social</h3>
                                                    <Row>
                                                        <Col sm={12} md={6}>
                                                            <Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Prepend>
                                                                        <SocialIcon
                                                                            className="social-icon social-icon--center"
                                                                            network="twitter"
                                                                        />
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={twitter || ''}
                                                                        placeholder={twitter || ''}
                                                                        onChange={(e) => {
                                                                            setTwitter(
                                                                                e.target.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Prepend>
                                                                        {/* <SocialIcon
                                                                    className="social-icon social-icon--center"
                                                                    network="dev.to"
                                                                /> */}
                                                                        <div className="social-icon social-icon--center">
                                                                            <div className="social-container">
                                                                                <svg
                                                                                    viewBox="0 32 447.99999999999994 448"
                                                                                    xmlns="http://www.w3.org/2000/svg"
                                                                                    width="2500"
                                                                                    height="2321">
                                                                                    <path d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35s5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z" />
                                                                                </svg>
                                                                            </div>
                                                                        </div>
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={devto || ''}
                                                                        placeholder={devto || ''}
                                                                        onChange={(e) => {
                                                                            setDevto(e.target.value)
                                                                        }}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Prepend>
                                                                        <SocialIcon
                                                                            className="social-icon social-icon--center"
                                                                            network="youtube"
                                                                        />
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={youtube || ''}
                                                                        placeholder={youtube || ''}
                                                                        onChange={(e) => {
                                                                            setYoutube(
                                                                                e.target.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col sm={12} md={6}>
                                                            <Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Prepend>
                                                                        <SocialIcon
                                                                            className="social-icon social-icon--center"
                                                                            network="github"
                                                                        />
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={github || ''}
                                                                        placeholder={github || ''}
                                                                        onChange={(e) => {
                                                                            setGithub(
                                                                                e.target.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Prepend>
                                                                        <SocialIcon
                                                                            className="social-icon social-icon--center"
                                                                            network="medium"
                                                                        />
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={medium || ''}
                                                                        placeholder={medium || ''}
                                                                        onChange={(e) => {
                                                                            setMedium(
                                                                                e.target.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                            <Form.Group>
                                                                <InputGroup className="mb-3">
                                                                    <InputGroup.Prepend>
                                                                        <SocialIcon
                                                                            className="social-icon social-icon--center"
                                                                            network="linkedin"
                                                                        />
                                                                    </InputGroup.Prepend>
                                                                    <Form.Control
                                                                        type="text"
                                                                        value={linkedIn || ''}
                                                                        placeholder={linkedIn || ''}
                                                                        onChange={(e) => {
                                                                            setlinkedIn(
                                                                                e.target.value
                                                                            )
                                                                        }}
                                                                    />
                                                                </InputGroup>
                                                            </Form.Group>
                                                        </Col>
                                                    </Row>

                                                    <Button variant="success" type="submit">
                                                        {loading ? 'Saving...' : 'Save Changes'}
                                                    </Button>
                                                </Form>
                                            </Card.Body>
                                        </Tab.Pane>
                                        <Tab.Pane eventKey="second">
                                            <h1>test2</h1>
                                        </Tab.Pane>
                                    </Tab.Content>
                                </Card>
                            </Col>
                        </Row>
                    </Tab.Container>
                </Container>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        let uid = await isLoggedIn(context)
        console.log('uid: ', uid)
        let response = await getUserWithId(uid)
        console.log('ssp: ', response)
        return {
            props: {
                session: uid,
                userInfo: response,
            },
        }
    } catch (err) {
        // console.log(err)
        // token not provided to firebase
        context.res.writeHead(302, { location: '/login' })
        if (err.code == 'auth/argument-error') {
            context.res.end()
        }
        return {
            props: {},
        }
    }
}
