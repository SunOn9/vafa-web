import Layout from '@/components/layout'
import styles from '../styles/Login.module.css'
import Form from '@/components/form'
export default function Login(){
    return(
        <Layout isloged={false} className={styles.main}>
            <Form issigned={true}> </Form>
        </Layout>
    )
}