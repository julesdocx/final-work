const firebase = require('../../firebase');

const db = firebase.firestoreDb;

const getStoriesByIds = async (storyIds) => {
    let storyObjArray = [];
    try {
        for (const id of storyIds) {
            const story = await getStoryById(id);
            storyObjArray.push(story)
        };
        console.log(storyObjArray);
        return storyObjArray
    } catch (err) {
        console.log(err);
        return null;
    }
  }

const getStoryById = async (id) => {
    try {
        const storyDocument = db.collection('stories').doc(id);
        const doc = await storyDocument.get();
        const story = doc.data();
        return story;
    } catch (err) {

    }
}

  module.exports = {
    getStoriesByIds,
  }
  