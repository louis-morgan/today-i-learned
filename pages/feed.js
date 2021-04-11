// Server
import isLoggedIn from '../utils/isLoggedIn'
import redirectToLogin from '../utils/redirectToLogin'
import { getAllPosts } from './api/posts/allPosts.js'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'

// Client
import { useContext } from 'react'
import { AuthContext } from '../context/auth.js'
import router from 'next/router'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import AddItem from '../components/AddItem'
import axios from 'axios'
import PostCard from '@components/PostCard'

function Feed({ session }) {
    const getAllPosts = () => {
        axios.get('api/posts/allPosts')
    }
    const { user } = useContext(AuthContext)
    const { data } = useQuery('posts', () => axios.get('api/posts/allPosts'))

    return (
        <>
            <Head>
                <title key="title">Feed</title>
            </Head>
            <main>
                <Container>
                    {user && (
                        <>
                            <AddItem />
                            {data.data &&
                                data.data.map((post) => {
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
    const { uid } = await isLoggedIn(context)
    if (uid) {
        const queryClient = new QueryClient()
        await queryClient.prefetchQuery('posts', getAllPosts)
        return {
            props: {
                dehydratedState: dehydrate(queryClient),
                session: uid,
                // posts: response,
            },
        }
    } else {
        redirectToLogin(context)
    }
}

export default Feed
