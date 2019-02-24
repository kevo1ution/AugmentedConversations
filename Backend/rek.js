
//setup aws rekognition
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const KEYS = require('./keys.json');

const REK = new AWS.Rekognition({
    region: "us-west-2",
    accessKeyId: KEYS.awskey,
    secretAccessKey: KEYS.awssecretkey,
});

/*
{ "_id" : ObjectId("5c7261c12eb5db37e8aebe8e"), "name" : "Yamen", "faceId" : "8ffb5c5a-806a-4781-928d-be357a8e4a14", "bio" : "I am a connosour of boba", "friends" : [ ], "interests" : [ "boba", "basketball", "programming", "hackathons", "movies", "anime" ], "privacy" : 0 }
{ "_id" : ObjectId("5c72635d5a0ade382a8ba7b8"), "name" : "Kevin Tang", "faceId" : "04b75315-7a4e-4491-a8e9-bad868945cc6", "bio" : "I enjoy programming and basketball", "friends" : [ ], "interests" : [ "basketball", "programming", "hackathons", "frisbee" ], "privacy" : 0 }
{ "_id" : ObjectId("5c72bd81b2915810459b66cb"), "name" : "Andy", "faceId" : "d7941dfe-e753-4ace-b50b-ac4b6468c444", "bio" : "I am tall", "friends" : [ ], "interests" : [ "fashion" ], "privacy" : 0 }
{ "_id" : ObjectId("5c72bd81b2915810459b66cc"), "name" : "Aman", "faceId" : "483ea789-da02-439e-8401-a736de0955c7", "bio" : "I like pokemon", "friends" : [ ], "interests" : [ "pokemon go" ],
 

*/

//performs call back function with face id
//dat is base64 buffer with picture data
//callback is function that takes success, faceid
function getFaceId(dat, callback){
    

    //set up parameters to query rekognition
    var params = {
        CollectionId: "People",
        FaceMatchThreshold: 95,
        Image: {
            Bytes: dat
        },
        MaxFaces: 1
    };

    //send request
    REK.searchFacesByImage(params, (err, data)=>{
        if(err){
            console.log(err, err.stack);
            callback(false, {})
        }else{
            //check if there is a match
            if(data.FaceMatches.length > 0){
                callback(true, data.FaceMatches[0].Face.FaceId);
                console.log(data.FaceMatches[0].Face.FaceId);
            }else{
                callback(false, {})
            }
        }
    });  
}

function addFace(dat, callback){
    var params = {
        CollectionId: "People",
        Image: {
            Bytes: dat
        },
        DetectionAttributes: ["DEFAULT"],
        ExternalImageId: uuid(), //"test" + id,
        MaxFaces: 1,
    };

    REK.indexFaces(params, (err, data)=>{
        if(err){
            console.log(err, err.stack);
            callback(false, {})
        }else{
            //check if there is a match
            if(data.FaceRecords.length > 0){
                callback(true, data.FaceRecords[0].Face.FaceId);
                console.log(data.FaceRecords[0].Face.FaceId);
            }else{
                callback(false, {})
            }
        }
    });
}

/*Creating collections (done once)
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
*/

module.exports = {
    getFaceId: getFaceId,
    addFace: addFace
}