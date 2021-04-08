import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    const { db } = await connectToDatabase()

    if (!req.body.uid || !req.body.email || !req.body.username) {
        res.status(400)
        res.json('credentials not provided')
    } else {
        try {
            const users = database.collection('users')
            const query = { username: req.body.username }
            const user = await users.findOne(query)
            const response = await db.collection('users').insertOne({
                _id: req.body.uid,
                email: req.body.email,
                displayName: '',
                username: req.body.username,
                profilePhotoUrl: '',
                socials: {
                    twitter: '',
                    devto: '',
                    youtube: '',
                    github: '',
                    medium: '',
                    linkedIn: '',
                },
            })
            res.json(response)
        } catch (err) {
            res.status(400).json(err)
        }
    }
}
