
//setup aws rekognition
const uuid = require('uuid/v4');
const AWS = require('aws-sdk');
const KEYS = require('./keys.json');

const REK = new AWS.Rekognition({
    region: "us-west-2",
    accessKeyId: KEYS.awskey,
    secretAccessKey: KEYS.awssecretkey,
});

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