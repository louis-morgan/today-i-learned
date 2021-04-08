import nookies from 'nookies'
import { verifyIdToken } from '../firebaseAdmin'

export default async function isLoggedIn(context) {
    try {
        const cookies = nookies.get(context)
        const token = await verifyIdToken(cookies.token)
        const { uid } = token
        return { uid }
    } catch (err) {
        // console.log(err)
        throw err?.errorInfo
    }
}
