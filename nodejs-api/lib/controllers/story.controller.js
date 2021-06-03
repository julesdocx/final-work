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

module.exports = router;