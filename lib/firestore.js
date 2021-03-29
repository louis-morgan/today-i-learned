import admin from 'firebase-admin';
const serviceAccount = require('../secrets.json')
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://today-i-learned-de137-default-rtdb.firebaseio.com'
  });
}

export default admin.firestore();