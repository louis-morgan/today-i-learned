import styles from './Header.module.scss'

export default function Header(props) {
    return(
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <h1 className={styles.title}>Today I Learned</h1>
                <p className={styles.text}>Today I learned (TIL) is a platform to post and share the things you learn on a daily basis. Our focus is on learning not influencing.</p>
            </div>
        </header>
    )
}