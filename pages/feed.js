// Server
import nookies from 'nookies'
import { verifyIdToken } from '../firebaseAdmin'
import { getFeed } from './api/posts/posts'

// Client
import { useContext } from 'react'
import { AuthContext } from '../context/auth.js'
import router from 'next/router'
import Head from 'next/head'
import { Container } from 'react-bootstrap'
import AddItem from '../components/AddItem'
import Navigation from '../components/Navigation'

function Feed({ session }) {
    const { user, signOut } = useContext(AuthContext)

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
        const cookies = nookies.get(context)
        const token = await verifyIdToken(cookies.token)
        const { uid } = token
        let response = await getFeed()
        console.log(response)

        return {
            props: {
                session: uid,
                posts: response,
            },
        }
    } catch (err) {
        console.log(err)
        // context.res.writeHead(302, { location: '/login' })
        context.res.end()
        return {
            props: {
                error: err,
            },
        }
    }
}

export default Feed
