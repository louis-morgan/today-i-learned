import { connectToDatabase } from '@utils/mongodb'

export default async function handler(req, res) {
    const id = req.query.id
    console.log(id)
}

export async function getUserWithId({ uid }) {
    console.log(uid)
    try {
        const { db } = await connectToDatabase()
        const response = await db.collection('users').findOne({ _id: uid })
        console.log(response)
        return response
        // res.status(200).json(response)
    } catch (err) {
        console.log(err)
        throw err
        // res.status(400).json('Something went wrong')
    }
}
