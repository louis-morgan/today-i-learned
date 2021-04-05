import { useContext } from 'react'
import { AuthContext } from '../auth'
import isLoggedIn from '../utils/isLoggedIn'
import { getPostsWithId } from './api/posts/posts'

export default function Profile({ posts, session }) {
    const { user } = useContext(AuthContext)
    return (
        <div>
            <h1>{user.email}'s posts!</h1>
            {posts?.length > 0 && (
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
            )}
        </div>
    )
}

export async function getServerSideProps(context) {
    try {
        let uid = await isLoggedIn(context, true)
        let response = await getPostsWithId(uid)
        return {
            props: {
                session: uid,
                posts: response,
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
