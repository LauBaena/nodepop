'use strict';
//Loading libraries
const express = require('express');
const createError = require('http-errors');
const Advertisement = require('../../models/Advertisement');
//Router creation
const router = express.Router();

//Static method 
//GET /api/advertisements   http://localhost:3000/api/agentes
router.get('/', async (req, res, next) => {
    try{
        //filters by name, forSale, price and tag 
        const name = req.query.name;           //(e.g. /api/advertisements?name=iphone)
        const forSale = req.query.forSale;     //(e.g. /api/advertisements?forSale=true)
        const price = req.query.price;         //(e.g. /api/advertisements?price=110.00 OR ?price=200-700 OR ?price=300- OR ?price=-300) 
        const tags = req.query.tags;           //(e.g. /api/advertisements?tags=motor)
        //pagination                             (e.g. /api/advertisements?skip=1&limit=2)
        const skip = req.query.skip;
        const limit = req.query.limit;
        //field selection                        (e.g. /api/advertisements?fields=name)
        const fields = req.query.fields; 
        //sort                                   (e.g. /api/advertisements?sort=price)
        const sort = req.query.sort; 

        const filter = {};
        if (name) {
            filter.name = new RegExp('^' + name, "i"); ;
        }
        if (tags) {
            filter.tags = {$in: tags};
        }
        if (forSale) {
            filter.forSale = forSale;
        }
        if (price) {
            if (price.includes('-')){
                const prices = price.split('-');
                if(prices[0] === ''){
                    filter.price = {$lte: prices[1]};
                }else if (prices[1] === ''){
                    filter.price = {$gte: prices[0]};
                }else{
                    filter.price = {$gte: prices[0], $lte: prices[1]}
                }
            }else{
                filter.price = price;
            }
        }

        const advertisements = await Advertisement.list(filter, skip, limit, fields, sort); 
        res.json({ ads: advertisements });
    }catch(err){
        next(err);
    }
});

//GET /api/advertisements/tags (e.g. /api/advertisements/tags)
router.get('/tags', async (req, res, next) => {
    try{
        const existingTags = await Advertisement.listTags();
        res.json({ tags: existingTags });
    }catch(err){
        next(err);
    }
});

//POST /api/advertisements   (body=adData)
router.post('/', async (req, res, next) => {
    try{
        const adData = req.body;
        const advertisement = new Advertisement(adData);
        const savedAd = await advertisement.save()
        res.json({ ad: savedAd });
    }catch(err){
        next(err);
    }
});

module.exports = router;

