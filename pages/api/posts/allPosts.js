import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    // #TODO:10 ## create 2 files here as its technically different endpoints now
    try {
        let response = await getAllPosts()
        res.json(response)
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function getAllPosts() {
    try {
        const { db } = await connectToDatabase()
        let response = await db.collection('posts').find({}).sort({ _id: -1 }).toArray()
        console.log(response)
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
