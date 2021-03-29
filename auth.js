import {useState, useEffect, useContext, createContext} from 'react'

import nookies from 'nookies'

import firebaseClient from './firebaseClient'
import firebase from 'firebase/app'
import "firebase/auth"

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    firebaseClient()
    // const db = firebase.firestore()

    async function createUser({cred, email}) {
        return db.collection('users').doc(cred.uid).set({
            email,
        }).then(() => {
            return true
            // window.location.href = '/authenticated'
            // TODO - use Link or something to send to authenticated but with serverSideProps so we can send this data to firestore on the server?
            // either way we need to know which ID is logged in in state somehow
            // check next-todo and make a mutation in AuthContext to set this from here?
        })
    }

    const [user, setUser] = useState(null)

    useEffect(() => {
        return firebase.auth().onIdTokenChanged(async (user) => {
            if(!user) {
                setUser(null)
                nookies.set(undefined, "token", "", {})
                return
            } 
            const token = await user.getIdToken()
            setUser(user)
            nookies.set(undefined, "token", token, {})
        })
    }, [])

    return(<AuthContext.Provider value={{user}}>{children}</AuthContext.Provider>)
}

// export const useAuth = useContext(AuthContext);