const express = require('express');
const router = express.Router();
const Quote = require('../models').Quote;
const records = require('../records');

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

router.get('/', asyncHandler(async (req, res) => {
    const quotes = await Quote.findAll();
    res.render('quotesAll', {quotes})
}));

router.get('/new', asyncHandler(async (req, res) => {
    res.render('new-page', {quote: {}});
}));

router.post('/new-submit', asyncHandler(async (req, res) => {
    const quote = await Quote.create(req.body);
    res.redirect('/quotes/' + quote.id)
}));

router.get('/yeezy', asyncHandler(async (req, res) => {
    const {quote} = await records.getKanyeQuote();
    const source = 'Omari West, K.';
    const url = req.originalUrl;
    res.render('index', {quote, source, url});
}));

router.get('/', asyncHandler(async (req, res) => {
    res.redirect('/random');
}));

router.get('/random', asyncHandler(async (req, res) => {
    const record = await records.randQuote();
    const {quote} = record;
    const {source} = record;
    const url = req.originalUrl;
    
    // res.json(quote);
    res.render('index', {quote, source, url});
}));

router.get('/quotes/:id', asyncHandler(async (req, res) => {
    const quote = await Quote.findByPk(req.params.id);
    res.render("quote", {quote})
}));

module.exports = router;