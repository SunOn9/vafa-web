/* eslint-disable import/no-anonymous-default-export */
import connectToDatabase from './connect';

export default async (req, res) => {
    const {query} = req.body;

    const client = await connectToDatabase();
    const db = client.db('test');
    
    const result = await db.collection('chat').find({
        query
    }).sort({ createdAt: -1 }).toArray();

    res.status(200).json(result)
};
