/* eslint-disable import/no-anonymous-default-export */
import connectToDatabase from './connect';

export default async (req, res) => {
    const {email, password} = req.body;

    const client = await connectToDatabase();
    const db = client.db('test');

    const result = await db.collection('user').insertOne({
        email,
        password
    });

    res.status(200).json({ message: 'Save success!', id: result.insertedId });
};