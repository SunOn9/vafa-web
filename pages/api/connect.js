import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://atta:190501@cluster0.zdkcp1y.mongodb.net/?retryWrites=true&w=majority";

let client;
let clientPromise;

if (!clientPromise) {
    client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    clientPromise = client.connect();
}

export default async function connectToDatabase() {
    await clientPromise;
    return client;
}