import Head from 'next/head'
import { useState, useContext } from 'react'
import Link from 'next/link'
import { AuthContext } from '../context/auth'
import Navigation from '@components/Navigation'
export default function Home() {
    // const {user} = useAuth()
    const { user } = useContext(AuthContext)

    // console.log(user);

    const [items, setItems] = useState([])

    const addItem = (item) => {
        setItems([...items, item])
    }

    return (
        <div>
            <Head>
                <title>Today I Learned</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main></main>
        </div>
    )
}
