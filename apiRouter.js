const express = require('express');
const apiRouter = express.Router();
const controller = require('./controller');

apiRouter.get('/', controller.getData, (req, res) => res.json(res.locals.objectInfo));

apiRouter.get('/search', controller.search, (req, res) => res.json(res.locals.data));

apiRouter.get('/account', controller.perAccountNum, (req, res) => res.json(res.locals.data));


module.exports = apiRouter;