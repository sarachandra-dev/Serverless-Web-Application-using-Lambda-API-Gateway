const express = require('express');
const { shareText, retrieveText } = require('../controllers/shareController');

const router = express.Router();

router.post('/share', shareText);
router.get('/retrieve/:code', retrieveText);

module.exports = router;
