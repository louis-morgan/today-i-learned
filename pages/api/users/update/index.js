import { connectToDatabase } from '@utils/mongodb'

export default async function handler(req, res) {
    console.log(req.body)
    try {
        const response = await updateUser(req.body)
        res.status(200).json(response)
    } catch (err) {
        res.status(400).json(err)
    }
}

export async function updateUser(data) {
    console.log(data)
    const { _id } = data
    try {
        const { db } = await connectToDatabase()
        const response = await db.collection('users').update(
            { _id },
            {
                $set: {
                    displayName: data.displayName,
                    socials: {
                        twitter: data.socials.twitter,
                        devto: data.socials.devto,
                        youtube: data.socials.youtube,
                        medium: data.socials.medium,
                        linkedIn: data.socials.linkedIn,
                        github: data.socials.github,
                    },
                },
            }
        )
        // console.log(response)
        return response
        // res.status(200).json(response)
    } catch (err) {
        console.log(err)
        throw err
        // res.status(400).json('Something went wrong')
    }
}
