const admin = require('firebase-admin')
const serviceAccount = require('./secrets.json')

export const verifyIdToken = (token) => {
    if(!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://today-i-learned-de137-default-rtdb.firebaseio.com'
        })
    }
    return admin.auth().verifyIdToken(token).catch((error) => {
        throw error;
    })
}