import {useState} from 'react'
import firebaseClient from '../firebaseClient'
import firebase from 'firebase'
import 'firebase/auth'

firebaseClient()
const db = firebase.firestore();

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return(
        <form onSubmit={e => e.preventDefault()}>
            <div className="field">
                <input type="text" name="email" value={email} required className="input" onChange={e => setEmail(e.target.value)}/>
            </div>
                <div className="field">
                <input type="password" name="pass" className="input" required value={pass} onChange={e => setPass(e.target.value)} />
            </div>
            <div className="field">
                <button disabled={email === "" || pass === ""} onClick={async () => {
                    await firebase.auth().createUserWithEmailAndPassword(email, pass).then((cred) => {
                        return db.collection('users').doc(cred.uid).set({
                            email,
                        }).then(() => {
                            window.location.href = '/feed'
                            // TODO - use Link or something to send to authenticated but with serverSideProps so we can send this data to firestore on the server?
                            // either way we need to know which ID is logged in in state somehow
                            // check next-todo and make a mutation in AuthContext to set this from here?
                        })
                    }).catch((err) => {
                        throw err
                    })
                }} className="button">Register</button>
                <button disabled={email === "" || pass === ""} onClick={async () => {
                    await firebase.auth().signInWithEmailAndPassword(email, pass).then((cred) => {
                        window.location.href = '/feed'
                    }).catch((err) => {
                        throw err
                    })
                }} className="button">Login</button>
            </div>
        </form>
    )
}