import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/auth'
import { ProfileContext } from '../context/profile'
import Head from 'next/head'
import { Container, Card } from 'react-bootstrap'
import isLoggedIn from '../utils/isLoggedIn'
import AddItem from '../components/AddItem'
import Navigation from '../components/Navigation'
import PostCard from '../components/PostCard'
import { getPostsWithId } from './api/posts/[uid]'

export default function Profile({ initialPosts, session }) {
    // #DOING:10 ## Figure out a way to update the list after you submit post, useEffect maybe? Context?
    const { user } = useContext(AuthContext)
    const { posts, setPosts } = useContext(ProfileContext)
    useEffect(() => {
        setPosts(initialPosts)
    }, [])
    return (
        <>
            <Head>
                <title>Today I Learned</title>
                <link rel="icon" href="/favicon.ico" />
                <meta charSet="utf-8" />
            </Head>
            <main>
                <Navigation />
                <Container>
                    {user && (
                        <>
                            <AddItem />
                            {posts?.length > 0 &&
                                posts.map((post) => {
                                    return <PostCard key={post._id} post={post} />
                                })}
                        </>
                    )}
                    {!user && <Container>Loading...</Container>}
                </Container>
            </main>
        </>
    )
}

export async function getServerSideProps(context) {
    try {
        let { uid } = await isLoggedIn(context, true)
        console.log(uid)
        let response = await getPostsWithId(uid)
        return {
            props: {
                session: uid,
                initialPosts: response,
            },
        }
    } catch (err) {
        // token not provided to firebase
        if (err.code == 'auth/argument-error') {
            context.res.writeHead(302, { location: '/login' })
            context.res.end()
        }
        return {
            props: {},
        }
    }
}
