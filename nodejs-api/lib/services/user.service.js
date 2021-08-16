const admin = require('firebase-admin');
const firebase = require('../../firebase')
var bcrypt = require('bcrypt');
const { use } = require('../controllers/story.controller');

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
      if (match) {
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
    return {username: user.username, email: user.email, stories: user.stories}
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
        username: user.username,
        email: user.email,
        password: cryptedPassword,
        stories: [],
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

const updateUserStory = async (req, res) => {
  const userId = req.body.userId;
  const story = req.body.story;
  try {
    const userRef = db.collection('users').doc(userId)
    const userDoc = await userRef.get()
    let user = await userDoc.data()
    if (user.stories) {
      user.stories.forEach((element) => {
        if (element.id == story.id) {
          console.log(user.stories.filter(elem => elem.id !== story.id), 'Em Got?');
          const newStories = [...user.stories.filter(elem => elem.id !== story.id),{title: story.title, description: story.description, author: story.author, id: story.id}];
          userRef.set({
            stories: newStories
          }, {merge: true});
        } else {
          const newStories = [...user.stories,{title: story.title, description: story.description, author: story.author, id: story.id}];
          console.log('watchout')
          userRef.set({
            stories: newStories
          }, {merge: true});
        }
      });
    } else {
      userRef.set({
        stories: [story]
      }, {merge: true});
    }
    res.status(200);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}

const deleteUserStory = async (req,res) => {
  const userId = req.query.userId;
  const storyId = req.query.storyId;

  try {
    const userRef = db.collection('users').doc(userId)
    const userDoc = userRef.get()
    const user = userDoc.data();
    const newStories = user.stories.filter(id => id !== storyId);
    userRef.set({
      stories: newStories
    }, {merge: true})
    res.status(200);
  } catch (error) {
    console.log(error);
    res.send(error)
  }
}

module.exports = {
  getAll,
  authenticateUser,
  getUserById,
  postUser,
  deleteUser,
  updateUser,
  updateUserStory,
  deleteUserStory,
}
