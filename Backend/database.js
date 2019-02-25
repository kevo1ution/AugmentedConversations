var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://localhost:27017/mydb";
var client = new MongoClient(MongoUrl, {useNewUrlParser: true});

var dbo;


client.connect(function(err){
	//open update database
	dbo = client.db("mydb");	
});

//non profit information
function addPerson(table){
    //table 
    /*
    table = {
        name: "", //Full name of person       
        faceId: "", //Corresponding face id with rekognition
        bio: "", //Short biography of the person
		friends: ["id1", "id2", "id3"], //friends list with face id
		interests: [], //array of interests
        privacy: 0-2, //0- everyone can see, 1- friends only, 2- everyone can see the person
	}
	list of possible interests:
	1. Animals
	2. Architecture
	3. Cars
	4. Art
	5. Fashion
	6. Sports
	7. Technology
	8. Science
	9. Nonprofits
	10. 
    */

	dbo.collection("People").insertOne(table, function(err, res){
		if(err){
            console.log(err);
        }
    });
}

//update the info of the person
function updatePerson(faceId, table, callback){
	dbo.collection("People").updateOne({'faceId': faceId}, 
		{ $set: table },
		{upsert: true}
	);
}

//gets the information of the person based off of their faceid
//people with higher privacy settings will have their info censored
function getPersonByFaceId(FaceId, callback){
	dbo.collection("People").find({'faceId': FaceId}).toArray(function(err,docs){
        if(err){
            console.log(err);
        }else{
            callback(docs);
        }
	});
}

//return all traits that you have in common
function getCommon(FaceId1, FaceId2, callback){

}

//meet new
function addContact(){

}

//utility
function closeDB(){
	client.close(); //close out the database
}

function changePrivacy(name, newPrivacy){
	dbo.collection("People").find({'name': name}).toArray(function(err,docs){
        if(err){
            console.log(err);
        }else{
            
        }
	});
}

module.exports = {
    addPerson: addPerson,
    updatePerson: updatePerson,
    getPersonByFaceId: getPersonByFaceId,
    getCommon: getCommon,
    addContact: addContact,
	closeDB: closeDB,
};
