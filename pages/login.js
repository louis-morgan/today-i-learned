import {useState, useContext} from 'react'
import firebaseClient from '../firebaseClient'
import {AuthContext} from '../auth'
import firebase from 'firebase'
import 'firebase/auth'

firebaseClient()
const db = firebase.firestore();

export default function Login(props) {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const { user, signIn } = useContext(AuthContext)
    
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
                    await signIn({email, pass})
                }} className="button">Register</button>
                <button disabled={email === "" || pass === ""} onClick={async () => {
                    await signIn({email, pass})
                }} className="button">Login</button>
            </div>
        </form>
    )
}