const express = require('express');

const actions = require('./actions');
const checkLogin = require("auth/middlewares/checkLogin");

const router = express.Router();

router.use(checkLogin(null, true));

router.get('/', actions.list);

module.exports = router;