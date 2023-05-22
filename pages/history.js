import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import {useEffect} from "react"
import styles from "../styles/History.module.css"

export default function History(props){
    const [history, setHistory] = useState([])
    const [userId, setUserId] = useState('')

    const router = useRouter()
    useEffect(() => {
        setUserId(router.query.id);
    }, [router.query]);

    const handle = async (event) => {
        event.preventDefault();

        const query = {id : userId}
        console.log(query)
        const response = await fetch("/api/findAll", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        });
        
        const historyData = response.json()
        historyData.then(function(result) {
            setHistory(result)
        });
    }

return(
    <Layout isloged >
        <button className={styles.button} type="submit" onClick={handle}> Load History </button>
        <div className={styles.main}>
        {history.length > 0 &&
                history.map((each) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className={styles.completion}>
                        <p>{each.createdAt}</p>
                        <div className={styles.question}>
                            <p>{each.question}</p>
                        </div>
                        <div className={styles.response}>
                            <p>
                                {each.value.split('\n').map(function( item) {
                                        return (
                                            <>
                                            {item}
                                            <br/>
                                            </>
                                        )
                                    })
                                }
                            </p>

                        </div>
                    </div>
                ))}
        </div>
    </Layout>
)}
