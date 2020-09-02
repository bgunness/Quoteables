const fs = require('fs');
const https = require('https');
const http = require('http');

function getDadJoke() {
    return new Promise((resolve, reject) => {
        var request = https.get('https://icanhazdadjoke.com/', {'headers': {'accept': 'application/json'}}, (res) => {
            var body = "";
    
            res.on('data', function(chunk) {
                body += chunk;
            })

            res.on('end', () => {
                joke = JSON.parse(body);
                resolve(joke);
            })
        })
    })
}

function getAdvice() {
    return new Promise((resolve, reject) => {
        var request = https.get('https://api.adviceslip.com/advice', {'headers': {'content-type': 'text/html; charset=utf-8'}}, (res) => {
            var body = "";

            res.on('data', (chunk) => {
                body += chunk;
            })

            res.on('end', () => {
                advice = JSON.parse(body);
                resolve(advice);
            })
        })
    })
}

module.exports = {getDadJoke, getAdvice};