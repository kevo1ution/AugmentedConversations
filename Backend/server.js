
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
    secretAccessKey: KEYS.awssecretkey,
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
    var dat = fs.readFileSync('./pics/test' + res + '.png');

    //set up parameters to query rekognition
    var params = {
        Image: {
            Bytes: dat
        },
        Attributes: ["DEFAULT"],
    };

    //send request
    REK.detectFaces(params, function(err, data){
        if(err){
            console.log(err, err.stack);
        }else{
            console.log(data);
            console.log(data.FaceDetails[0].BoundingBox);
        }

    });
}

function createCollection(){
    var params = {
        CollectionId: "DJT"
    };

    REK.createCollection(params, (err, data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
        }
    });
}

function addFace(prefix, id){
    var dat = fs.readFileSync('./pics/' + prefix + id + '.png');
    var params = {
        CollectionId: "DJT",
        Image: {
            Bytes: dat
        },
        DetectionAttributes: ["DEFAULT"],
        ExternalImageId: "test" + id,
        MaxFaces: 1,
    };

    REK.indexFaces(params, (err, data)=>{
        console.log(data.FaceRecords[0].Face.FaceId);
    });
}

function searchFace(id){
    var dat = fs.readFileSync('./pics/test' + id + '.png');
    var params = {
        CollectionId: "DJT",
        FaceMatchThreshold: 95,
        Image: {
            Bytes: dat
        },
        MaxFaces: 1
    };
    console.time("time" + id);

    REK.searchFacesByImage(params, (err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
            console.log(data.FaceMatches[0].Face.FaceId);
        }
        console.timeEnd("time" + id);
    });
}

/*
searchFace(1);
searchFace(2);
searchFace(3);
searchFace(4);
searchFace(5);
*/

addFace("htest", 1);
//dtrump: c2328e2a-566d-4c2f-8011-4339c233b291
//hclinton: c5af267f-1f70-41a7-842b-f379208a3f12
