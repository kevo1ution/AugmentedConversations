var mongo = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var MongoUrl = "mongodb://localhost:27017/mydb";
var client = new MongoClient(MongoUrl, {useNewUrlParser: true});

var dbo;


client.connect(function(err){
	//open update database
	dbo = client.db("mydb");

	/*testing stuff
	addUser({
		username: "kevin",
		password: "pass",
		prefArr: ['pref1', 'pref2', 'pref3']
	});
	*/
	
	/*
	addNP("", {name: "", item: "" })
	*/
	/*
	dbo.collection("NP").insertMany(
		[{name: "TEXAS WOMENS FOUNDATION", item: "water bottle"},
		{name: "Young Women's Preparatory Network", item: "water bottle"},
		{name: "Women In Need of Generous Support", item: "clothes"},
		{name: "Womens Foodservice Forum", item: "clothes"},
		{name: "H.I.S. BRIDGEBUILDERS", item: "water bottle"},
		{name: "SKILL QUEST", item: "clothes"},
		{name: "Inclusive Communities Housing Development Corporation", item: "water bottle"},
		{name: "GREEN CAREERS DALLAS", item: "clothes"},
		{name: "H.I.S. BRIDGEBUILDERS", item: "clothes"},
		{name: "SKILL QUEST", item: "clothes"},
		{name: "Inclusive Communities Housing Development Corporation", item: "water bottle"},
		{name: "GREEN CAREERS DALLAS", item: "water bottle"}]
	);
	*/	
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
    */

	dbo.collection("People").insertOne(table, function(err, res){
		if(err){
            console.log(err);
        }
    });
}

//update the info of the person
function updatePerson(table, callback){
	dbo.collection("People").updateOne({'faceId': table.faceId}, 
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

module.exports = {
    addPerson: addPerson,
    updatePerson: updatePerson,
    getPersonByFaceId: getPersonByFaceId,
    getCommon: getCommon,
    addContact: addContact,
	closeDB: closeDB,
};
