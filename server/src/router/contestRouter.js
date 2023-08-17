const contestRouter = require('express').Router();
const upload = require('../utils/fileUpload');
const contestController = require('../controllers/contestController');
const basicMiddlewares = require('../middlewares/basicMiddlewares');

contestRouter.put(
  '/:contestId',
  upload.updateContestFile,
  contestController.updateContest,
);

contestRouter.get(
  '/:contestId',
  basicMiddlewares.canGetContest,
  contestController.getContestById,
);

module.exports = contestRouter;
