import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    if (!req.body.uid || !req.body.email) {
        res.status(400)
        res.json('credentials not provided')
    } else {
        const response = await db.collection('users').insertOne({
            _id: req.body.uid,
            email: req.body.email,
        })
        res.json(response)
    }
}
