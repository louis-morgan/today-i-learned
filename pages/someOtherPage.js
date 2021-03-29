import {useContext} from 'react'
import {AuthContext} from '../auth'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'

firebaseClient()
const db = firebase.firestore();

export default function someOtherPage(props) {
    const {user} = useContext(AuthContext)
    console.log(user);
    console.log(db);

    return(
        <pre>
            <h1>{JSON.stringify(user)}</h1>
            <button onClick={async () => {
                return await db.collection('users').doc(user.uid).set({
                    email: user.email,
                    apropname: 'some string'
                }).then(() => {
                    // window.location.href = '/authenticated'
                    console.log('ran');
                    // TODO - use Link or something to send to authenticated but with serverSideProps so we can send this data to firestore on the server?
                    // either way we need to know which ID is logged in in state somehow
                    // check next-todo and make a mutation in AuthContext to set this from here?
                }).catch((err) => {
                    console.log(err);
                })
            }}></button>
        </pre>
    )
}