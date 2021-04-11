import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    const { db } = await connectToDatabase()
    if (!req.body.uid || !req.body.email || !req.body.username) {
        res.status(400)
        res.json('Fields not provided')
    } else {
        try {
            // const users = db.collection('users')
            // const query = { username: req.body.username }
            // const user = await users.findOne(query)
            const response = await db.collection('users').insertOne({
                _id: req.body.uid,
                email: req.body.email,
                display_name: '',
                username: req.body.username,
                avatar: '',
                socials: {
                    twitter: '',
                    dev_to: '',
                    youtube: '',
                    github: '',
                    medium: '',
                    linkedIn: '',
                },
                bio: '',
                created_at: Date.now(),
                posts: [],
                topics: [],
            })
            res.json(response)
        } catch (err) {
            console.log(err)
            res.status(400).json(err)
        }
    }
}
