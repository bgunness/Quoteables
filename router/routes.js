const express = require('express');
const router = express.Router();
const Quote = require('../models').Quote;
const records = require('../records');
const helpers = require('../helpers');
const { sequelize } = require('../models');


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
    res.render('index');
}))

// router.get('/', asyncHandler(async (req, res) => {
//     const quotes = await Quote.findAll({ order: [["createdAt", "DESC"]] });
//     res.render('quotesAll', {quotes})
// }));

/* Get Kanye quotes from API */
router.get('/kanye', asyncHandler(async(req, res) => {
    const {quote} = await records.getKanyeQuote();
    const source = 'Omari West, K.';
    const url = helpers.cleanURL(req.originalUrl);
    res.render('kanye', {quote, source, url});
}));

/* Get random advice page */
router.get('/advice', asyncHandler(async(req, res) => {
    const advice = await records.getAdvice();
    const url = helpers.cleanURL(req.originalUrl);
    res.render('advice', {advice, url});
}));

/* Get inspiration page */
router.get('/inspiration/:id', asyncHandler(async(req, res) => {
    // if (req.params.id == '1') {
    //     const quote = await Quote.findByPk(req.params.id);
    // } else {
    //     const quote = await Quote.findByPk(req.params.id);
    // }
    const quote = await Quote.findByPk(req.params.id);
    const url = helpers.cleanURL(req.originalUrl);
    res.render('inspiration', {quote, url})
}))

router.get('/inspiration', asyncHandler(async(req, res) => {
    const quote = await Quote.findOne({order: sequelize.random()})
    const url = helpers.cleanURL(req.originalUrl);
    res.render('inspiration', {quote, url});
}));

/* Get specified quote to edit */
router.get('/:id/edit', asyncHandler(async(req, res) => {
    const quote = await Quote.findByPk(req.params.id);
    res.render('edit', {quote});
}));

/* Post newly edited quote */
router.post('/:id/edit', asyncHandler(async(req, res) => {
    const quote = await Quote.findByPk(req.params.id);
    await quote.update(req.body);
    res.redirect('/');
}));

/* Get new quote form */
router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-page', {quote: {}});
}));

/* Post newly created quote */
router.post('/new-submit', asyncHandler(async (req, res) => {
    const quote = await Quote.create(req.body);
    res.redirect('/')
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

/* Get a specific quote */
router.get('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await Quote.findByPk(req.params.id);
    res.render("quote", {quote})
}));

/* Below code was used before implementation of SQL database */

    // router.get('/', asyncHandler(async (req, res) => {
    //     res.redirect('/random');
    // }));

    // router.get('/random', asyncHandler(async (req, res) => {
    //     const record = await records.randQuote();
    //     const {quote} = record;
    //     const {source} = record;
    //     const url = req.originalUrl;
        
    //     // res.json(quote);
    //     res.render('index', {quote, source, url});
    // }));

module.exports = router;