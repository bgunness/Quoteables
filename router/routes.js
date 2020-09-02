const express = require('express');
const router = express.Router();
const Quote = require('../models').Quote;
const records = require('../records');
const helpers = require('../helpers');
const { sequelize } = require('../models');
const { Op } = require('sequelize');


//  Async Handler -- inserts try/catch blocks
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next)
        } catch(err) {
            res.status(500).send(err);
        }
    }
}

/* Get home page */
router.get('/', asyncHandler(async(req, res) => {
    const url = helpers.cleanURL(req.originalUrl);
    res.render('index', {url});
}))

/* Get Dad joke from API */
router.get('/jokes', asyncHandler(async(req, res) => {
    const {joke} = await records.getDadJoke();
    console.log(joke);
    const url = helpers.cleanURL(req.originalUrl);
    res.render('jokes', {joke, url});
}));

/* Get random advice page */
router.get('/advice', asyncHandler(async(req, res) => {
    const advice = await records.getAdvice();
    const url = helpers.cleanURL(req.originalUrl);
    res.render('advice', {advice, url});
}));

router.get('/inspiration', asyncHandler(async(req, res) => {
    const quote = await Quote.findOne({order: sequelize.random()})
    const url = helpers.cleanURL(req.originalUrl);
    if (quote) {
        res.render('inspiration', {quote, url});
    } else {
        const msg = true
        res.render('inspiration', {url, msg})
    }
}));

/* Get all inspirational quotes */
router.get('/inspiration-all', asyncHandler(async(req, res) => {
        const quotes = await Quote.findAll({ order: [["createdAt", "DESC"]] });
        res.render('inspiration-all', {quotes})
}))

/* Post newly edited quote */
router.post('/inspiration-all', asyncHandler(async(req, res) => {
    try {
        const quote = await Quote.findByPk(req.body.id);
        await quote.update(req.body);
        res.redirect('inspiration-all')
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            const quotes = await Quote.findAll({ order: [["createdAt", "DESC"]] });
            res.render('inspiration-all', {quotes, errors: err.errors})
        }
    }
}))

/* Post search bar parameters */
router.post('/inspiration-all-search', asyncHandler(async(req, res) => {
    if (req.body.source == '') {                        //Searching an empty string returns all the quotes       //functions as expected, throws generic error
        res.redirect('inspiration-all')
    } else {
        try {
            const quotes = await Quote.findAll({
                where: {
                    source: {
                        [Op.or] : {
                            [Op.startsWith] : `${req.body.source}`,
                            [Op.endsWith] : `${req.body.source}`   //To search regardless of accidental spaces around the 'source' value and capitalization
                        }
                    }
                }
            })
            if (quotes.length === 0) {
                const msg = true
                res.render('inspiration-all', {quotes, msg})
            } else {
                res.render('inspiration-all', {quotes})
            }
        } catch (err) {
            console.log(err)
        }
    }
}))

/* Delete selected quote */
router.post('/inspiration-all/delete', asyncHandler(async(req, res) => {
    const quote = await Quote.findByPk(req.body.id);
    if (quote) {
        await quote.destroy();
    }
    res.redirect('/inspiration-all')
}))

/* Get new quote form */
router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-page', {quote: {}});
}));

/* Post newly created quote */
router.post('/new-submit', asyncHandler(async (req, res) => {
    try {
        const quote = await Quote.create(req.body);
        res.redirect('inspiration-all')
    } catch (err) {
        if (err.name === "SequelizeValidationError") {
            res.render('new-page', {errors: err.errors})
        }
    }
}));

/* Delete a quote */
router.post('/delete', asyncHandler(async(req, res) => {
    const quote = await Quote.findByPk(req.body.delete)
    console.log(quote);
    if (quote) {
        await quote.destroy();
    }
    res.redirect('/');
}));

module.exports = router;