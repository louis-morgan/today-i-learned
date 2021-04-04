import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler(req, res) {
    let response = await getPosts(req.params.uid)
    res.json(response)
}

export async function getPosts(uid) {
    const { db } = await connectToDatabase()
    const response = await db
        .collection('posts')
        .find({ userId: '9BsyK4W6kUNViupnow4m2oA4BLp1' })
        .toArray()

    console.log(response)

    let newArray = response.map((post) => {
        console.log(post)
        return {
            _id: `${post._id}`,
            title: post.title,
            description: post.description,
            userId: post.userId,
        }
    })

    console.log(response)

    return newArray
}
