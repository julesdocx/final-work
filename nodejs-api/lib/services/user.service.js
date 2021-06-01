const admin = require('firebase-admin');
const firebase = require('../../firebase')
var bcrypt = require('bcrypt');

const saltRounds = 10;
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
    let returnValue = null;
    const userDocumentRef = db.collection('users')
    const snapshot = await userDocumentRef.where('email', '==', username).get()
    if (snapshot.empty) {
      console.log('No matching documents.');
      return returnValue;
    }
    snapshot.forEach(doc => {
      const user = doc.data();
      if (user.password == password){
        returnValue = {user: user, id: doc.id};
      }
    });
    return returnValue;
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
    const userDocument = db.collection('users').doc(user.email);
    const doc = await userDocument.get();
    console.log(user, 'user log')
    if (doc.exists) {
      res.status(403).send(`user with email ${user.email}, already exists`)
    } else {
      userDocument.set({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password,
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
