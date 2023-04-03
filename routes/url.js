const express = require('express');
const { getnerateUrl ,getAna} = require('../controller/url');
const router = express.Router();

router.route('/').post(getnerateUrl);
router.route('/analytics/:id').get(getAna)

module.exports = router;