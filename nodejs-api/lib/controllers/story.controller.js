const express = require('express');
const { checkRoles } = require('../middlewares/passport');
const storyService = require('../services/story.service');
let router = express.Router();

router.get('/list/:idList', (req, res) => {
  const idArray = req.params.idList.split(',');
  storyService.getStoriesByIds(idArray).then((list) => {
    if (list.length > 0) {
      res.status(200).send(list);
    } else {
      res.send('stories not found');
    }
  });
});

router.post('/upload', (req, res) => {
  storyService.uploadStory(req, res);
});

router.post('/update', (req,res) => {
  storyService.updateStory(req, res);
});

router.delete('/delete/:id', (req,res) => {
  storyService.deleteStory(req, res);
});

router.get('/getall', (req, res) => {
  storyService.getStories(req, res);
});

router.get('/getstory/:id', (req, res) => {
  storyService.getStoryById(req, res);
});

module.exports = router;