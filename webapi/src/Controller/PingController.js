const express = require('express');

const router = express.Router();

router.get('/', async (_, res) => {
  res.json({ ping: new Date() });
});

module.exports = router;
