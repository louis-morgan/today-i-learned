import nookies from 'nookies'
import {verifyIdToken} from '../firebaseAdmin'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
import AddItem from '../components/AddItem/AddItem'
function Authenticated({session}) {
    firebaseClient()
    if(session) {
        return(
            <div className="wrapper">
                <div className="field">
                    You are authenticated
                </div>
                <div>{session}</div>
                <AddItem />
                <div className="field">
                    <button className="button" onClick={async () => {
                        await firebase.auth().signOut();
                        window.location.href = '/login'
                    }}>Sign Out</button>
                </div>
            </div>
        )
    } else {
        return(
            <div className="wrapper">
                Loading...
            </div>
        )
    }
}

export async function getServerSideProps(context) {
    try {
        const cookies = nookies.get(context)
        const token = await verifyIdToken(cookies.token)
        const {uid, email} = token;

        return {
            props: {
                session: `Your email is ${email} and your UID is ${uid}`
            }
        }
    } catch(err) {
        context.res.writeHead(302, {location: '/login'})
        context.res.end()
        return {
            props: [{}]
        }
    }
}

export default Authenticated
