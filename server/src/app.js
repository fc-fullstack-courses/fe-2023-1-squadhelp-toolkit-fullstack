const express = require('express');
const cors = require('cors');
const router = require('./router');
const multerErrorHandler = require('./handlerError/multerHandler');
const handlerError = require('./handlerError/handler');
const { DEV_FILES_PATH } = require('./constants');

const createApp = () => {
  const app = express();

  app.use(cors());
  app.use(express.json());
  app.use('/public', express.static(DEV_FILES_PATH));
  app.use(router);

  app.use(multerErrorHandler);
  app.use(handlerError);

  return app;
};

module.exports = createApp;
