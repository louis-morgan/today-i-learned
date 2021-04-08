import { useState, useEffect, useContext, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import nookies from 'nookies'

import firebaseClient from '../firebaseClient'
import firebase from 'firebase/app'
import 'firebase/auth'

export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
    axios.defaults.baseURL = '/'
    firebaseClient()
    const router = useRouter()
    const [loading, setLoading] = useState(true)

    const createUser = async ({ uid, email }) => {
        try {
            return await axios.post('api/users/register', { uid, email })
        } catch (err) {
            throw err
        }
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
                throw err
            })
    }

    // #DONE:10 See if we can reduce this to just using async await rather than .thens completed:2021-04-03T09:21:08.434Z
    const signUp = async ({ email, pass }) => {
        try {
            const response = await firebase.auth().createUserWithEmailAndPassword(email, pass)
            const uid = response.user.uid
            await response.user.getIdToken()
            await createUser({ uid, email })
            router.push('/feed')
        } catch (error) {
            // #DOING:5 - Add error handling UI
            throw error
        }
    }

    const updateUser = async (newUser) => {
        // console.log(newUser)
        try {
            return await axios.post('api/users/update', newUser)
        } catch (err) {
            throw err
        }
    }

    useEffect(() => {
        console.log('useEffect ran')
        return firebase.auth().onIdTokenChanged(async (user) => {
            if (!user) {
                // !loading && setLoading(true)
                setUser(null)
                nookies.set(undefined, 'token', '', {})
                return
            }
            const token = await user.getIdToken()
            setUser(user)
            // loading && setLoading(false)
            nookies.set(undefined, 'token', token, {})
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, signIn, signOut, signUp, loading, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(authContext)
}

// export const useAuth = useContext(AuthContext);
