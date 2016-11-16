var express = require("express");
var app = express();

var mongojs = require("mongojs");
var db = mongojs("contactlist", ["contactlist"]);
var bodyParser = require("body-parser");

// app.get("/", function(req, res){
	// res.send("Hello world!!");
// });

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactlist", function(req, res){
	console.log("I received a GET request.");
	
	db.contactlist.find(function (err, docs){
		console.log(docs);
		res.json(docs);
	});
	
	// person1 = {
		// name : "Abc",
		// email: "abc@abc.com",
		// number: "123"
	// };
	
	// person2 = {
		// name : "Def",
		// email: "def@def.com",
		// number: "456"
	// };
	
	// person3 = {
		// name : "Ghi",
		// email: "ghi@ghi.com",
		// number: "789"
	// };
	
	// var contactlist = [person1, person2, person3];
	// res.json(contactlist);
});


app.post('/contactlist', function(req, res){
	console.log(req.body);
	db.contactlist.insert(req.body, function (err, docs){
		//console.log(docs);
		res.json(docs);
		sendMail(req.body.email);
	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	db.contactlist.remove({_id:mongojs.ObjectId(id)}, function (err, docs){
		//console.log(docs);
		res.json(docs);
	});
});

app.get("/contactlist/:id", function(req, res){
	var id = req.params.id;
	console.log("Edit id  @server :" + id);
	db.contactlist.findOne({_id:mongojs.ObjectId(id)}, function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

app.put("/contactlist/:id", function(req, res){
	var id = req.params.id;
	console.log("Edit id  @server :" + id);
	db.contactlist.findAndModify(
	{
		query:{_id:mongojs.ObjectId(id)}, 
		update:{$set:{name:req.body.name, email:req.body.email, number:req.body.number}}, 
		new:true
	}, 
	function (err, docs){
		console.log(docs);
		res.json(docs);
	});
});

var sendMail = function(email){
		var mailer = require("nodemailer");

		// Use Smtp Protocol to send Email
		var smtpTransport = mailer.createTransport("SMTP",{
			service: "Gmail",
			auth: {
				user: "sujit.extentia@gmail.com",
				pass: "ext123!@#"
			}
		});

		var mail = {
			from: "Sujit Singh <sujit.extentia@gmail.com>",
			to: email,
			subject: "Welcome to MEAN app.",
			text: "Hope to have a nice relation with you.",
			html: "<b>Hope to have a nice relation with you.</b>"
		}

		smtpTransport.sendMail(mail, function(error, response){
			if(error){
				console.log(error);
			}else{
				console.log("Message sent: " + response.message);
			}

			smtpTransport.close();
		});
	}

app.listen(3000);
console.log("Server listening on port 3000.");