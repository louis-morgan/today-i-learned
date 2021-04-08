const admin = require('firebase-admin')
const serviceAccount = require('./secrets.json')

serviceAccount.private_key = process.env.AUTH_PRIVATE_KEY
serviceAccount.private_key_id = process.env.AUTH_PRIVATE_KEY_ID

console.log(process.env.AUTH_PRIVATE_KEY_ID)

export const verifyIdToken = (token) => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://today-i-learned-de137-default-rtdb.firebaseio.com',
        })
    }
    return admin
        .auth()
        .verifyIdToken(token)
        .catch((error) => {
            throw error
        })
}
