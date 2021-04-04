import { useState, useContext } from 'react'
import { AuthContext } from '../../auth'
import styles from './AddItem.module.scss'
import axios from 'axios'

export default function AddItem(props) {
    const { user } = useContext(AuthContext)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post('api/posts/create', {
                userId: user.uid,
                title,
                description,
            })
            console.log(res)
            setTitle('')
            setDescription('')
        } catch (err) {
            console.log(err)
            alert('Oops! Something went wrong!')
        }
    }

    return (
        <div className="wrapper">
            <form className={styles.form} action="#" onSubmit={handleSubmit}>
                <div className="field">
                    <input
                        className="input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        type="text"
                        name="title"
                        placeholder="What did you learn today?"
                    />
                </div>
                <div className="field">
                    <textarea
                        className="input"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        name="desc"
                        id="desc"
                        cols="30"
                        rows="10"
                        placeholder="Any more details?"></textarea>
                </div>
                <div className="field">
                    <button className="button" type="submit">
                        Share the knowledge!
                    </button>
                </div>
            </form>
        </div>
    )
}
