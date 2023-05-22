import Header from "./header";
import styles from '../styles/Layout.module.css'

export default function Layout({children, isloged}){
    let value = isloged
    return(
        <>
            <Header isloged={value}/>
            <main className={styles.main}>
                {children}
            </main>
        </>
    )
}