const express = require('express');
const router = express.Router();
const { signup, getbill } = require('../controller/controller');

/**routers */
router.post('/users/signup', signup);
router.post('/product/getbill', getbill);

module.exports = router;
