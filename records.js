const fs = require('fs');
const https = require('https');
const http = require('http');

async function randId() {
    const quotes = await getQuotes();
    const length = quotes.quotes.length;

    return id  = Math.floor(Math.random() * length);
}

function getQuotes() {      //return all quotes
    return new Promise((resolve, reject) => {
        fs.readFile('data.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const json = JSON.parse(data);
                // console.log(json.quotes.length);
                resolve(json);
            }
        })
    })
}

async function getQuote(id) {
    const quotes = await getQuotes();  
    try {     //return specific quote
        return quotes.quotes.find(record => record.id == id);
    } catch (err) {

    }
}

async function randQuote() {
    const id = await randId();
    return getQuote(id);
}

function getKanyeQuote() {
    return new Promise((resolve, reject) => {
        var request = https.get('https://api.kanye.rest', function(res) {
            var body = "";
    
            res.on('data', function(chunk) {
                body += chunk;
            })

            res.on('end', () => {
                yeezy = JSON.parse(body);
                resolve(yeezy);
            })
        })
    })
}

module.exports = {getQuotes, getQuote, getKanyeQuote, randId, randQuote};