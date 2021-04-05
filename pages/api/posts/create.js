import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    const { db } = await connectToDatabase()
    if (!req.body.title || !req.body.description || !req.body.userId) {
        res.status(400)
        res.json('Post data not provided')
    } else {
        const response = await db.collection('posts').insertOne({
            userId: req.body.userId,
            title: req.body.title,
            description: req.body.description,
        })
        res.json(response)
    }
}
