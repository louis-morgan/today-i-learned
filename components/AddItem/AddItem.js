import {useState, useContext} from 'react';
import { AuthContext } from '../../auth'
import styles from './AddItem.module.scss'
import firebaseClient from '../../firebaseClient'
import firebase from 'firebase'
import axios from 'axios'
import 'firebase/auth'

firebaseClient()
const db = firebase.firestore();

export default function AddItem(props) {
    const {user} = useContext(AuthContext);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()

        db.collection('users').doc(user.uid).collection('posts').add({title, description})
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        setTitle('')
        setDescription('')
    }

    return(
        <div className="wrapper">
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className="field">
                    <input className="input" value={title} onChange={e => setTitle(e.target.value)} type="text" name="title" placeholder="What did you learn today?"/>
                </div>
                <div className="field">
                    <textarea className="input" value={description} onChange={e => setDescription(e.target.value)} name="desc" id="desc" cols="30" rows="10" placeholder="Any more details?"></textarea>
                </div>
                <div className="field">
                    <button className="button" type="submit">Share the knowledge!</button>
                </div>
            </form>
        </div>
    )

}