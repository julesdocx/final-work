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
    const userDocument = db.collection('users').where('email', '==', username);
    const doc = await userDocument.get();
    const user = doc[0].data();
    console.log(user, 'user log')
    if (!doc.exists) {
      return null
    } else if(user.password == password) {
      console.log(user)
      return user
    }
  } catch (err) {
    return null
  }
}

const getUserByEmail = async (req, res) => {
  console.log('user:id', req.params.email);
  try {
    const userDocument = db.collection('users').doc(email);
    const doc = await userDocument.get();
    const user = doc.data();
    console.log(user, 'user log')
    res.status(200).send(user)
  } catch (err) {
    console.log(err);
    res.send(err)
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
  getUserByEmail,
  postUser,
  deleteUser,
  updateUser,
}
