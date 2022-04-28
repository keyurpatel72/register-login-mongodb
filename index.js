
const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const UserModel = require("./models/user");
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/formdb');

var db=mongoose.connection;

db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
	console.log("connection succeeded");
})
const app = express();
const port = 2300
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));


// register form
app.get('/register', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/register.html'));
});

app.post('/post-register',function(request,response){
		var email =request.body.email;
		var username = request.body.username;
		var password = request.body.password;

		var data = {
			"email":email,
			"username":username,
			"password":password
		}
	db.collection('users').insertOne(data,function(err, collection){
			if (err) throw err;
			console.log("Record inserted Successfully"); 
			if(collection){
				return response.redirect('/');
			 }
		});
});

 //login form
app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/login.html'));
});
app.post('/login_pros', function(request, response) {
	// // Capture  fields
	 var username = request.body.username;
	 var password = request.body.password;
	

	if (username && password) {
		
	UserModel.findOne({ username: username, password: password }, function (err, user) {
	         if(err){
				console.log('database error');
                        }
                        if(user){
							return response.redirect('http://skote-light.node.themesbrand.com/');
                         }
                 })
			
	}else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});



app.get('/forgot-password', function(request, response) {
	response.sendFile(path.join(__dirname + '/public/forgot-password.html'));
});


app.get('/home', function(request, response) {
	//  user  login
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
  });










  
// const express = require('express');
// const session = require('express-session');
// const path = require('path');
// const bodyparser = require('body-parser');
// const UserModel = require("./models/user")




// const mongoose = require('mongoose');
// mongoose.connect('mongodb://127.0.0.1:27017/formdb');
// var db=mongoose.connection;




// //db.on('error', console.log.bind(console, "connection error"));
// db.on('error',console.error.bind(console,"connection error"));
// db.once('open', function(callback){
// 	console.log("connection succeeded");
// })

        
// module.exports={
//      createData:function(inputData, callback){
                  
//         userData= new UserModel(inputData);
//         userData.save(function(err, data){
//           if (err) throw err;
//            return callback(data);
//         });
// 	}
// }
	


// const app = express();
// const port = 2300
// app.use(bodyparser.urlencoded({extended:false}))
// app.use(bodyparser.json())
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, '/public')));

// app.get('/', function(request, response) {
// 	response.sendFile(path.join(__dirname + '/public/login.html'));
// });


// app.post('/login_pros', function(request, response) {
// 	// // Capture the input fields
// 	 let username = request.body.username;
// 	let password = request.body.password;
// 	//let username = request.query.username;
// //	let password = request.query.password;
	
// 	if (username && password) {
	
	
// 			if (error) throw error;
			
// 			if (results.length > 0) {
			
// 				request.session.loggedin = true;
// 				request.session.username = username;
		
// 				response.redirect('/home');
// 			} else {
// 				response.send('Incorrect Username and/or Password!');
// 			}			
// 			response.end();
		
// 	} else {
// 		response.send('Please enter Username and Password!');
// 		response.end();
// 	}
// });



// app.get('/home', function(request, response) {
// 	//  user  login
// 	if (request.session.loggedin) {
// 		// Output username
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		// Not logged in
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });


// app.listen(port, () => {
// 	console.log(`Example app listening on port ${port}`)
//   });
