var express = require('express');
var router = express.Router();

const { exchangeController } = require('../controller');

// ex) GET /exchange/getpost
router.get('/getposts', exchangeController.getposts.getposts);
router.post('/registerpost', exchangeController.registerpost.registerpost);

module.exports = router;
