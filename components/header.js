import Link from "next/link"
import styles from '../styles/Header.module.css'
import { useRouter } from "next/router";

export default function Header({isloged}){
    const router = useRouter()
    const handle = async (event) => {
        event.preventDefault();
        const response = await fetch('/api/logout')
        router.push('/')
    }
    return(
        <header>
            <nav >
                <ul className={styles.navbar}>
                    {isloged ? (
                        <>
                            <li className={styles.navItems}>
                                <Link className="link" href='/chat'>CHAT</Link>
                            </li>
                            <li className={styles.navItems}> 
                                <Link className="link" href='/' onClick={handle}>LOG OUT</Link>   
                            </li >
                        </>
                    ) : (
                        <>
                            <li className={styles.navItems}>
                                <Link className="link" href='/'>HOME</Link>
                            </li>
                            <li className={styles.navItems}>
                                <Link className="link" href='/login'>LOGIN</Link>
                            </li>
                        </>
                        
                    )}
                </ul>
            </nav>
        </header>
    )
}