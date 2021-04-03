import {useState, useEffect, useContext, createContext} from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'

import firebaseClient from './firebaseClient'
import firebase from 'firebase/app'
import "firebase/auth"

export const AuthContext = createContext({})

export const AuthProvider = ({children}) => {
    firebaseClient()
    const db = firebase.firestore()
    const router = useRouter()

    const createUser = async ({cred, email}) => {
        console.log(cred);
        return await db.collection('users').doc(cred.uid).set({
            email,
        }).then(() => {
            router.push('/feed')
        }).catch(err => {
            return JSON.stringify(err)
        })
    }

    const [user, setUser] = useState(false)

    const signOut = () => {
        return firebase
          .auth()
          .signOut()
          .then(() => {
              setUser(false)
              router.push('/login')
            })

      };

    const signIn = async ({email, pass}) => {
        await firebase.auth().signInWithEmailAndPassword(email, pass).then((cred) => {
             cred.additionalUserInfo.isNewUser && createUser({cred, email})
             router.push('/feed')
        }).catch((err) => {
            throw err
        })
    }

    useEffect(() => {
        console.log('useEffect ran');
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

    return(<AuthContext.Provider value={{user, signIn, signOut}}>{children}</AuthContext.Provider>)
}

export const useAuth = () => {
    return useContext(authContext);
  };

// export const useAuth = useContext(AuthContext);