import { useState, useEffect, useContext, createContext } from 'react'
import axios from 'axios'
import { AuthContext } from './auth'
export const ProfileContext = createContext({})

export const ProfileProvider = ({ children }) => {
    const { user } = useContext(AuthContext)
    const [posts, setPosts] = useState([])

    const addPost = async (post) => {
        try {
            await axios.post('api/posts/create', post)
            let freshPosts = await axios.get(`api/posts/${user.uid}`)
            console.log('add post ran')
            setPosts(freshPosts)
            console.log(res)
        } catch (err) {
            console.log(err)
            throw err
        }
    }

    return (
        <ProfileContext.Provider value={{ posts, setPosts, addPost }}>
            {children}
        </ProfileContext.Provider>
    )
}

// export const useAuth = useContext(AuthContext);
