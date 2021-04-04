import { useContext } from 'react'
import axios from 'axios'
import nookies from 'nookies'
import { AuthContext } from '../auth'
import isLoggedIn from '../utils/isLoggedIn'
import { getPosts } from './api/posts/posts'
// import { isLoggedIn } from '../firebaseAdmin'

export default function Profile({ posts, session }) {
    console.log(posts)
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1>{user.email}'s posts!</h1>
            <ul>
                {posts.map((post) => {
                    return (
                        <li>
                            <h3>{post.title}</h3>
                            <br />
                            <p>{post.description}</p>
                            <br />
                            <p>{post._id}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        let uid = await isLoggedIn(context)
        // const { db } = await connectToDatabase()
        // const response = await db.collection('posts')
        let response = await getPosts(uid)
        return {
            props: {
                session: uid,
                posts: response,
            },
        }
    } catch (err) {
        // console.log('error: ', err)
        // context.res.writeHead(302, { location: '/login' })
        context.res.end()
        return {
            props: {},
        }
    }
}
