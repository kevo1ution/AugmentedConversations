
//create endpoints with express
const http = require('http');
const uuid = require('uuid/v4');
const express = require('express');
const url = require('url');
const bodyparser = require('body-parser');
const fs = require('fs');

//setup aws rekognition
const AWS = require('aws-sdk');
const KEYS = require('./keys.json');

const REK = new AWS.Rekognition({
    region: "us-west-2",
    accessKeyId: KEYS.awskey,
    secreteAccessKey: KEYS.awssecretkey,
});

//express app
var app = express();
app.use(bodyparser.json({limit: '50mb'}));

//process image
app.post('/image', processImage);

//process image function
function processImage(req, res){
    //get the buffer, convert image to base 64
    //var buff = new Buffer(req.body.image, 'base64');
    //var tempId = uuid();
    //fs.writeFileSync('./pics/' + tempId + '.png', buff);
    //var dat = fs.readFileSync('./pics/' + tempId + '.png');
    var dat = fs.readFileSync('./pics/test.png');

    //set up parameters to query rekognition
    var params = {
        Image: {
            Bytes: dat
        },
        Attributes: ["DEFAULT"],
    };

    //send request
    rekognition.detectFaces(params, function(err, data){
        if(err) console.log(err, err.stack);
        else console.log(data);
    });
}