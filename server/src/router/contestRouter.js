const contestRouter = require('express').Router();
const upload = require('../utils/fileUpload');
const contestController = require('../controllers/contestController');

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest,
);

module.exports = contestRouter;
