var express = require('express');
var router = express.Router();

const { exchangeController } = require('../controller');

// * GET /exchange/getpost
router.get('/getposts', exchangeController.getposts.getposts);

module.exports = router;
