import Head from 'next/head'
import AddItem from '../components/AddItem/AddItem'
import Header from '../components/Header/Header'
import ItemsList from '../components/ItemsList/ItemsList'
import {useState, useContext} from 'react';
import Link from 'next/link'
import {AuthContext} from '../auth'


export default function Home() {

  // const {user} = useAuth()
  const {user} = useContext(AuthContext);

  // console.log(user);

  const [items, setItems] = useState([])

  const addItem = (item) => {
      setItems([...items, item])
  }

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Header />
        <div>
          {`User ID: ${user ? user.uid : 'No user siged in'}`}
        </div>
        <div className="field">
          <button className="button" disabled={user}>
            <Link href="/authenticated">
              Go to authenticated route
            </Link>
          </button>
          <button className="button" disabled={!user}>
            <Link href="/login">
              Login
            </Link>
          </button>
        </div>
        {/* <AddItem addItem={addItem} />
        <div className="wrapper">
          <hr className="line"/>
        </div>
        <ItemsList items={items} /> */}
      </main>
    </div>
  )
}
