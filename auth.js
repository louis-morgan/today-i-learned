import { useState, useEffect, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import nookies from 'nookies'

import firebaseClient from './firebaseClient'
import firebase from 'firebase/app'
import 'firebase/auth'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    firebaseClient()
    const router = useRouter()

    const createUser = async ({ uid, email }) => {
        const res = await axios.post('api/users/register', { uid, email })
        return res
    }

    const [user, setUser] = useState(false)

    const signOut = async () => {
        await firebase.auth().signOut()
        setUser(false)
        router.push('/login')
    }

    const signIn = async ({ email, pass }) => {
        await firebase
            .auth()
            .signInWithEmailAndPassword(email, pass)
            .then((cred) => {
                router.push('/profile')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    // #DONE:10 See if we can reduce this to just using async await rather than .thens completed:2021-04-03T09:21:08.434Z
    const signUp = async ({ email, pass }) => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, pass)
            const uid = response.user.uid
            await response.user.getIdToken()
            const dbResponse = await createUser({ uid, email })
        } catch (error) {
            // #TODO:5 - Add error handling UI
            console.log(error)
            alert('Oops! Something went wrong!')
        }
    }

    useEffect(() => {
        console.log('useEffect ran')
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null)
                nookies.set(undefined, 'token', '', {})
                return
            }
            const token = await user.getIdToken()
            setUser(user)
            nookies.set(undefined, 'token', token, {})
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, signUp }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}

// export const useAuth = useContext(AuthContext);
