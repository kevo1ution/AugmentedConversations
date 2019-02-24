
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
    rek.getFaceId(dat, (succ, faceid)=>{
        //get data from mongodb with faceid
        if(succ){
            database.getPersonByFaceId(faceid, (docs)=>{
                res.json(docs);
            });
        }else{

        }
    });
});

app.listen(8000, ()=>{
    console.log('listening on 8000');
});

/*process image function
function processImage(req, res){
    //get the buffer, convert image to base 64
    //var buff = new Buffer(req.body.image, 'base64');
    //var tempId = uuid();
    //fs.writeFileSync('./pics/' + tempId + '.png', buff);
    //var dat = fs.readFileSync('./pics/' + tempId + '.png');
    var dat = fs.readFileSync('./pics/test' + res + '.png');

}

function addFace(prefix, id){
    var dat = fs.readFileSync('./pics/' + prefix + id + '.png');
    rek.addFace(dat, (succ, data)=>{
        
    });
}

function searchFace(prefix, id){
    var dat = fs.readFileSync('./pics/' + prefix + id + '.png');
    rek.getFaceId(dat, (succ, FaceInfo)=>{

    });
}

searchFace(1);
searchFace(2);
searchFace(3);
searchFace(4);
searchFace(5);
*/

//searchFace("test", 2);
//dtrump: c2328e2a-566d-4c2f-8011-4339c233b291
//hclinton: c5af267f-1f70-41a7-842b-f379208a3f12

/*add kevin
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
*/


//cleanup
const cleanup = require('./cleanup.js');
cleanup.Cleanup(function(){
	console.log("cleaning up");
	database.closeDB();
});

