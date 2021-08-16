const firebase = require('../../firebase');

const db = firebase.firestoreDb;

const getStoriesByIds = async (storyIds) => {
    let storyObjArray = [];
    try {
        for (const id of storyIds) {
            const storyDocument = await db.collection('stories').doc(id).get();
            storyObjArray.push(storyDocument.data())
        };
        return storyObjArray
    } catch (err) {
        console.log(err);
        return null;
    }
  }

const getStoryById = async (req, res) => {
    console.log(req.params);
    const id = req.params.id
    try {
        const storyDocument = db.collection('stories').doc(id); 
        const doc = await storyDocument.get();
        const story = doc.data();
        res.status(200).send(story);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const getStories = async (req, res) => {
    try {
        let stories = []
        const storiesRef = db.collection('stories');
        const snapshot = await storiesRef.get();
        snapshot.forEach(element => {
            stories.push(element.data());
        });
        res.status(200).send(stories);
    } catch (err) {
        console.log(err);
        res.send(err);
    }
}

const uploadStory = async (req, res) => {
    const story = req.body.story
    try {
        const { id } = await db.collection('stories').add({
            title: story.title,
            description: story.description,
            author: story.description,
            chapters: story.chapters
        });
        db.collection('stories').doc(id).set({id: id}, {merge: true});
        res.status(200).send(id)
    } catch (err) {
        console.log(err)
        res.send(err)
    }
}

const updateStory = async (req, res) => {
    const story = req.body.story;
    try {
        const {id} = await db.collection('stories').doc(story.id).set({
            title: story.title,
            description: story.description,
            author: story.author,
            chapters: story.chapters,
            id: story.id
        });
        res.status(200).send(id)
    } catch (error) {
        console.log(error);
        res.send(error)
    }
}

const deleteStory = async (req, res) => {
    const id = req.params.id;
    try {
        db.collection('stories').doc(id).delete();
        res.status(200).send(id);
    } catch (error) {
        console.log(error);
        res.send(error);
    }
}   

  module.exports = {
    getStoriesByIds,
    uploadStory,
    updateStory,
    deleteStory,
    getStoryById,
    getStories,
  }
  