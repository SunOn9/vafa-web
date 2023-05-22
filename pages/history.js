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

        const response = await fetch("/api/findAll", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(query)
        })
            .then((response) => response.json())
            .then((user) => {
                return user.address;
            });
        const historyData = response.json()
        historyData.map((data) => (
            console.log(data)
        ))
        setHistory(historyData)
    }

return(
    <Layout isloged >
        <button type="submit" onClick={handle}> Load History </button>
        <div className={styles.main}>
            {history.length > 0 &&
                    history.map((data) => (
                        // eslint-disable-next-line react/jsx-key
                        <p>{data}</p>
                    ))
            }
        </div>
    </Layout>
)}
