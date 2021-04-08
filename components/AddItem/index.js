import { useState, useContext } from 'react'
import { AuthContext } from '../../context/auth'
import { Card, Button, Form, Modal, Tabs, Tab } from 'react-bootstrap'
import styles from './AddItem.module.scss'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import { ProfileContext } from '../../context/profile'
var HtmlToReactParser = require('html-to-react').Parser

export default function AddItem(props) {
    const { user } = useContext(AuthContext)
    const { addPost } = useContext(ProfileContext)
    const md = new MarkdownIt()
    const htmlToReactParser = new HtmlToReactParser()

    const [showModal, setShowModal] = useState(false)
    const handleCloseModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [showDescription, setShowDescription] = useState(false)

    const handleDiscard = async (e) => {
        e.preventDefault()
        setTitle('')
        setDescription('')
        setShowModal(false)
        setShowDescription(false)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            addPost({
                userId: user.uid,
                title,
                description,
            })

            setTitle('')
            setDescription('')
        } catch (err) {
            console.log(err)
            alert('Oops! Something went wrong!')
        }
    }

    return (
        <>
            <Form onSubmit={handleSubmit} className="w-100 mt-4 mb-4">
                <Tabs defaultActiveKey="edit" className="ml-0 mr-0 mb-0 border-bottom">
                    <Tab eventKey="edit" title="Teach">
                        <Card
                            className="border-top-0"
                            style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                            <Card.Body>
                                <Form.Group>
                                    <Form.Label className="text-muted">
                                        What did you learn today?
                                    </Form.Label>
                                    <Form.Control
                                        size="lg"
                                        type="text"
                                        onFocus={(e) => setShowDescription(true)}
                                        placeholder="Was it that dogs can't look up?"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </Form.Group>
                                {showDescription && (
                                    <>
                                        <Form.Group>
                                            <Form.Control
                                                size="md"
                                                type="text"
                                                rows={10}
                                                as="textarea"
                                                placeholder="Tell us more..."
                                                value={description}
                                                onChange={(e) => setDescription(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Button type="submit">Share</Button>
                                        <Button
                                            onClick={(e) =>
                                                description != ''
                                                    ? handleShowModal()
                                                    : setShowDescription(false)
                                            }
                                            variant="link"
                                            className="text-danger">
                                            {description == '' ? 'Close' : 'Discard'}
                                        </Button>
                                    </>
                                )}
                            </Card.Body>
                        </Card>
                    </Tab>
                    {description != '' && (
                        <Tab eventKey="preview" title="Preview">
                            <Card
                                className="border-top-0"
                                style={{ borderTopLeftRadius: '0', borderTopRightRadius: '0' }}>
                                <Card.Body style={{ minHeight: '400px' }}>
                                    <h1>{title}</h1>
                                    {description != '' &&
                                        htmlToReactParser.parse(md.render(description))}
                                </Card.Body>
                            </Card>
                        </Tab>
                    )}
                </Tabs>
            </Form>
            <Modal show={showModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This action cannot be undone. Are you sure you want to discard this post?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleCloseModal}>
                        No! Take me back!
                    </Button>
                    <Button variant="danger" onClick={(e) => handleDiscard(e)}>
                        Yes burn it.
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
