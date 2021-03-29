import {useState, useEffect} from 'react'
import styles from './ItemsList.module.scss'
export default function ItemsList(props) {

    console.log(props.items);

    return(
        <div className="wrapper">
            <ul className={styles.list}>
            {props.items && props.items.map((item, i) => {
                return(<li className={styles.item} key={i}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </li>)
            })}
            </ul>
        </div>
    )
}