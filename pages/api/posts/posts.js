import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    let response = await getPosts(req.params.uid)
    res.json(response)
}

export async function getPosts(uid) {
    try {
        const { db } = await connectToDatabase()
        let response = await db
            .collection('posts')
            .find({ userId: '9BsyK4Wiupnow4m2oA4BLp1' })
            .toArray()
        response = response.map((post) => {
            return {
                _id: `${post._id}`,
                title: post.title,
                description: post.description,
                userId: post.userId,
            }
        })
        return response
    } catch (err) {
        throw err
    }
}
