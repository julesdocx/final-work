const admin = require('firebase-admin');
const firebase = require('../../firebase')
var bcrypt = require('bcrypt');

const saltRounds = 11;
const db = firebase.firestoreDb

// const postTestUser = async () => {
//   const userDocument = db.collection('users');
//   await userCollection.add({
//     'firstname': 'Louis',
//     'lastname': 'Van Langendonck',
//     'email': 'lvl.14@gmail.com',
//     'password': 'Test123.'
//   });
// }

const authenticateUser = async ({
  username,
  password
}) => {
  try {
    const userDocumentRef = db.collection('users')
    const snapshot = await userDocumentRef.where('email', '==', username).get()
    if (snapshot.empty) {
      console.log('No matching documents.');
      return null;
    }
    let snapshotDoc;
      snapshot.forEach(doc => {
        snapshotDoc = doc;
      })
      const user = snapshotDoc.data();
      const match = await bcrypt.compare(password, user.password);
      console.log(match, password, user.password)
      if (match){
        return {user: user, id: snapshotDoc.id};
      }
  } catch (err) {
    console.log(err);
    return null
  }
}

const getUserById = async (id) => {
  try {
    const userDocument = db.collection('users').doc(id);
    const doc = await userDocument.get();
    const user = doc.data();
    return {firstname: user.firstname, lastname: user.lastname, email: user.email, storyReferences: user.storyReferences}
  } catch (err) {
    console.log(err);
    return null
  }
}

// GET ALL
const getAll = async (req, res) => {

  try {

    
  } catch (err) {

    
  }
}

// POST
const postUser = async (req, res) => {
  const user = req.body.user
  try {
    const userDocumentRef = db.collection('users')
    const snapshot = await userDocumentRef.where('email', '==', user.email).get()
    const cryptedPassword = await bcrypt.hash(user.password, saltRounds)
    console.log(user, 'user log')
    if (!snapshot.empty) {
      res.status(403).send(`user with email ${user.email}, already exists`)
    } else {
      userDocumentRef.add({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: cryptedPassword,
      }, { merge: true });
      res.status(200).send('successful registration');
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }

}

// DELETE
const deleteUser = async (req, res) => {

}

// UPDATE
const updateUser = async (req, res) => {

}

module.exports = {
  getAll,
  authenticateUser,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
}
