import Layout from '@/components/layout'
import styles from '../styles/Chat.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import {  useEffect } from "react"
import {FaHistory} from 'react-icons/fa';

export default function Chat(props){
    const [currentId, setCurrentId] = useState('');
    const [message, setMessage] = useState('')
    const [chats, setChats] = useState([]);
    const router = useRouter()

    useEffect(() => {
        setCurrentId(router.query.id);
    }, [router.query]);

    const handle = async (event) => {        
        event.preventDefault();
        router.push({
            pathname: '/history',
            query: { id: currentId }
        }, '/history')
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        //get response from ...

        const data = {
            model: "gpt-3.5-turbo",
            max_tokens: 3800,
            messages: [
            {
                role: "user",
                content: message,
            },
            ],
        };
        const JSONdata = JSON.stringify(data);
        
        const endpoint = 'https://api.pawan.krd/v1/chat/completions';
        
        const options = {
            method: 'POST',

            headers: {
            'Authorization': "Bearer pk-tvCyIlXThuxlWPDsqwOJYTxLSQevKkXCrEANoIongjRdXbWh",
            'Content-Type': 'application/json',
            },

            body: JSONdata,
        };

        const response = await fetch(endpoint, options);
        const result = await response.json();

        const chat = {
            id: currentId,
            createdAt: result.created,
            value: result.choices[0].message.content,
            question: message
        }

        const JSONdataToDB = JSON.stringify(chat);
        setChats([...chats,chat]);
        setMessage('')

        const dataDB = chat;
        
        const responseDB = await fetch("/api/create", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(dataDB)
        });
        
        if (responseDB.ok) {
            console.log("Data created successfully");
        } else {
            console.error("Failed to create data");
        }
    };
    

    return(
        <Layout isloged >
            <div className={styles.main}>
                {chats.length > 0 &&
                chats.map((chat) => (
                    // eslint-disable-next-line react/jsx-key
                    <div className={styles.completion}>
                        <div className={styles.question}>
                            <p>{chat.question}</p>
                        </div>
                        <div className={styles.response}>
                            <p>
                                {chat.value.split('\n').map(function( item) {
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
            <div className={styles.bottom}>
                    <button className={styles.his}
                        onClick={handle}
                    >
                        <FaHistory/>
                    </button>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" required/>
                </form>
            </div>      
        </Layout>
    )
}