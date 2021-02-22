const express = require('express');
const PingController = require('../Controller/PingController');

const router = express.Router();

router.use('/', PingController);

module.exports = router;
