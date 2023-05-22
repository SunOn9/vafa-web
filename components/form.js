import Link from "next/link"
import styles from '../styles/Form.module.css'
import { useState } from "react";
import { useRouter } from 'next/router';

export default function Form({issigned}){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repass, setRepass] = useState('')
    const router = useRouter()

    const handleSubmitSign = async (event) => {
        event.preventDefault();

        if (repass != password){
            alert("Passwords are not the same!");
        }
        else{
            const data = {
                email : email,
                password : password
            }

            const response = await fetch("/api/createUser", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                alert("Account created successfully")
                router.push('/login')
            } else {
                alert("Failed to create account");
            }
        }
        
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        
        const data = {email : email}
        const response = await fetch("api/find",{
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (result.email ==  email) {
            if (result.password == password){
                router.push({
                    pathname: '/chat',
                    query: { id: result._id.toString() }
                }, '/chat')
            }
            else {
                alert("Uncorrect Password!")
            }
        }
        else{
            alert("Unsigned email!")
        }
    }

    return(
        <div className={styles.main}>
            {issigned ? (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <label className={styles.input}>
                        <span>Email</span>
                        <input onChange={(e) => setEmail(e.target.value)} 
                        type="email" name="email" id="email" placeholder="Input email..." required/>
                    </label>
                    <label className={styles.input}>
                        <span>Password</span>
                        <input onChange={(e) => setPassword(e.target.value)}
                        type="password" name="pass" id="pass" placeholder="Input password... "
                        required minLength="8" autoComplete="off"/>
                    </label>
                        
                    <div className={styles.bottom}>
                        <Link href='/signin' className={styles.link}>Do not have an account ?</Link>
                        <button className={styles.button} type="submit">Login</button>
                    </div>
                </form>
            ):(
                <form onSubmit={handleSubmitSign} className={styles.form}>
                    <label className={styles.input}>
                        <span>Email</span>
                        <input onChange={(e) => setEmail(e.target.value)} 
                        type="email" name="email" id="email" placeholder="Input email..." required/>
                    </label>
                    <label className={styles.input}>
                        <span>Password</span>
                        <input onChange={(e) => setPassword(e.target.value)}
                        type="password" name="pass" id="pass" placeholder="Input password... "
                        required minLength="8" autoComplete="off"/>
                    </label>
                    <label className={styles.input}>
                        <span>Re-Password</span> 
                        <input onChange={(e) => setRepass(e.target.value)}
                        type="password" name="repass" id="repass" placeholder="Input password again..."
                        required minLength="8" autoComplete="off"/>
                    </label>
                    <div className={styles.bottom}>
                        <Link href='/login' className={styles.link}>Already have account ?</Link>
                        <button className={styles.button} type="submit">Sign In</button>
                    </div>
                </form>
            )}
            
        </div>
    )
}