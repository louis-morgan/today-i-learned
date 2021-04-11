import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/auth.js'
import { ProfileContext } from '../../context/profile'
import Head from 'next/head'
import { Container, Row, Col } from 'react-bootstrap'
import isLoggedIn from '../../utils/isLoggedIn'
import AddItem from '../../components/AddItem'
import Navigation from '../../components/Navigation'
import PostCard from '../../components/PostCard'
import UserInfo from '../../components/UserInfo'
import { getPostsWithId } from '../api/posts/[uid]'

export default function Profile({ initialPosts, session }) {
    // #DOING:10 ## Figure out a way to update the list after you submit post, useEffect maybe? Context?
    const { user } = useContext(AuthContext)
    const { posts, setPosts } = useContext(ProfileContext)
    useEffect(() => {
        setPosts(initialPosts)
        console.log(user)
    }, [])
    return (
        <>
            <Head>
                <title key="title">Profile</title>
            </Head>
            <main>
                <Container className="mt-5">
                    <Row>
                        <Col sm={12} md={4}>
                            <UserInfo />
                        </Col>
                        <Col sm={12} md={8}>
                            <>
                                <AddItem />
                                {posts?.length > 0 &&
                                    posts.map((post) => {
                                        return <PostCard key={post._id} post={post} />
                                    })}
                            </>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        let { uid } = await isLoggedIn(context, true)
        let response = await getPostsWithId(uid)
        return {
            props: {
                session: uid,
                initialPosts: response,
            },
        }
    } catch (err) {
        // token not provided to firebase
        context.res.writeHead(302, { location: '/login' })
        context.res.end()
        return {
            props: {},
        }
    }
}
