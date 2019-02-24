const fs = require('fs');
const http = require('http');
const requests = require('request');

requests.post({
    headers: {
        'content-type': 'application/json'
    },
    url: 'http://localhost:8000/image',
    body: {
        image: fs.readFileSync('./pics/yamen.png')
    }
}, function(error, html, body){
    console.log(error)
    console.log(html)
    console.log(body);
});