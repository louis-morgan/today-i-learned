import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    // #TODO:10 ## create 2 files here as its technically different endpoints now
    let response = await getFeed(req.params.uid)
    res.json(response)
}

export async function getFeed() {
    try {
        const { db } = await connectToDatabase()
        let response = await db.collection('posts').find({}).toArray()
        // console.log(response)
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

export async function getPostsWithId({ uid }) {
    try {
        const { db } = await connectToDatabase()
        let response = await db.collection('posts').find({ userId: uid }).toArray()
        console.log(uid)
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
