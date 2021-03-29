import firebase from '../../lib/firestore';

export default (req, res) => {
  
  firebase
    .collection('users')
    .doc('EuYvUMvuOwQt7V0oNDjMgunsSZv1')
    .get()
    .then((doc) => {
        console.log(doc);
      res.json(doc.data());
    })
    .catch((error) => {
        console.log(error);
      res.json({ error });
    });
};