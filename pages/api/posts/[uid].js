import { connectToDatabase } from '../../../utils/mongodb'

export default async function handler({ query: { uid } }, res) {
    console.log('uid: ', uid)
    try {
        const response = await getPostsWithId(uid)
        console.log('res: ', response)
        res.status(200).json(response)
    } catch (err) {
        console.log('error: ', err)
        res.status(400).json(err)
    }
}

export async function getPostsWithId(uid) {
    try {
        const { db } = await connectToDatabase()
        console.log('uid in func', uid)
        let response = await db.collection('posts').find({ userId: uid }).limit(20).toArray()
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
