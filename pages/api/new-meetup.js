import { MongoClient } from "mongodb";

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
    // connecting the mongodb server to the project 
    
    if (req.method === 'POST') {
        const data = req.body;
        
       const client = await MongoClient.connect(
         "mongodb+srv://kehad01:Keahnney01@cluster0.eu6zk1q.mongodb.net/?retryWrites=true&w=majority"
       );
        const db = client.db("next-js-mongodb");

        const meetupsCollection = db.collection('meetups');

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({ message: 'Meetup inserted successfully' });
    }
}

export default handler;