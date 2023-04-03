const shortid = require('shortid');
const urlModel = require('../models/url');
const getnerateUrl=async(req,res)=>{
    const body= req.body;
    if(!body.url)
    {
        return res.status(400).json({error:'url is required'});
    }
    const shortId = shortid();
    await urlModel.create({
        shortId:shortId,
        redirectURL:body.url,
        visitHistory:[]
    })
    return res.json({id:shortId});
}

const getAna=async(req,res)=>{
    const data =await urlModel.findOne({shortId:req.params.id});
    return res.json({
        totalCLick:data.visitHistory.length,analytics:data.visitHistory
    })

}
module.exports={getnerateUrl,getAna}