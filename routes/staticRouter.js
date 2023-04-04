const express = require('express');
const url = require('../models/url');
const router = express.Router();

router.route('/').get(async(req,res)=>{
   const all_url=await url.find({});
    res.render('home',{urls:all_url});
})


module.exports = router;