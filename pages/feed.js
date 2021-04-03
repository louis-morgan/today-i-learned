import nookies from 'nookies'
import { useContext } from 'react'
import { verifyIdToken } from '../firebaseAdmin'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase'
import AddItem from '../components/AddItem'
import { AuthContext } from '../auth'
function Feed({ session }) {
    firebaseClient()
    const db = firebase.firestore()
    const { signOut } = useContext(AuthContext)
    if (session) {
        return (
            <div className="wrapper">
                <div className="field">You are authenticated</div>
                <div>{session}</div>
                <AddItem />
                <div className="field">
                    <button
                        className="button"
                        onClick={async () => {
                            let res = await signOut()
                            console.log(res)
                        }}>
                        Sign Out
                    </button>
                </div>
            </div>
        )
    } else {
        return <div className="wrapper">Loading...</div>
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context)
        const token = await verifyIdToken(cookies.token)
        const { uid, email } = token

        return {
            props: {
                session: `Your email is ${email} and your UID is ${uid}`,
            },
        }
    } catch (err) {
        console.log(err)
        context.res.writeHead(302, { location: '/login' })
        context.res.end()
        return {
            props: [{}],
        }
    }
}

export default Feed
