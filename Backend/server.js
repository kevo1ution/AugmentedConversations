
//create endpoints with express
const http = require('http');
const express = require('express');
const url = require('url');
const bodyparser = require('body-parser');
const rek = require('./rek.js');
const database = require('./database.js');
const fs = require('fs');

//express app
var app = express();
app.use(bodyparser.json({limit: '50mb'}));

//Returns the call with information on the person within the picture
//gives empty table if person doesn't exist in databases
//gives table filled with person's interests, bio, name, etc.
app.post('/image', function(req, res){
    
    //1. get face id
    var dat = new Buffer(req.body.image, 'base64');
    console.log("Recieved Data");
    rek.getFaceId(dat, (succ, faceid)=>{
        //get data from mongodb with faceid
        if(succ){
            database.getPersonByFaceId(faceid, (docs)=>{
                console.log(docs);
                res.json(docs);

            });
        }else{
            console.log("unsuccessful");
        }
    });
});

//update user privacy
app.post('/update/privacy', function(req,res){
    database.updatePerson(req.body.faceId, {"privacy":req.body.privacy}, ()=>{});
});

app.get('/', function(req,res){
    console.log("Get request");
    res.send("hello");
});

app.listen(8000, ()=>{
    console.log('listening on 8000');
});

/*
//add kevin
var dat = fs.readFileSync('./pics/kevin.png');
rek.getFaceId(dat, (succ, faceid)=>{
    database.addPerson({
        name: "Kevin Tang", //Full name of person       
        faceId: faceid, //Corresponding face id with rekognition
        bio: "I enjoy programming and basketball", //Short biography of the person
        friends: [], //friends list with face id
        interests: ["basketball", "programming", "hackathons", "frisbee"],
        privacy: 0, //0- everyone can see, 1- friends only, 2- everyone can see the person
    });
});

//add yamen
dat = fs.readFileSync('./pics/yamen.png');
rek.getFaceId(dat, (succ, faceid)=>{
    database.addPerson({
        name: "Yamen", //Full name of person       
        faceId: faceid, //Corresponding face id with rekognition
        bio: "I am a connosour of boba", //Short biography of the person
        friends: [], //friends list with face id
        interests: ["boba", "basketball", "programming", "hackathons", "movies", "anime"],
        privacy: 0, //0- everyone can see, 1- friends only, 2- everyone can see the person
    });
});

//adding andy
var dat = fs.readFileSync('./pics/andy.png');
rek.addFace(dat, (succ, faceid)=>{
    database.addPerson({
        name: "Andy", //Full name of person       
        faceId: faceid, //Corresponding face id with rekognition
        bio: "I am tall", //Short biography of the person
        friends: [], //friends list with face id
        interests: ["fashion"],
        privacy: 0, //0- everyone can see, 1- friends only, 2- everyone can see the person
    });
});

//add aman
dat = fs.readFileSync('./pics/aman.png');
rek.addFace(dat, (succ, faceid)=>{
    database.addPerson({
        name: "Aman", //Full name of person       
        faceId: faceid, //Corresponding face id with rekognition
        bio: "I like pokemon", //Short biography of the person
        friends: [], //friends list with face id
        interests: ["pokemon go"],
        privacy: 0, //0- everyone can see, 1- friends only, 2- everyone can see the person
    });
});
*/

//cleanup
const cleanup = require('./cleanup.js');
cleanup.Cleanup(function(){
	console.log("cleaning up");
	database.closeDB();
});

