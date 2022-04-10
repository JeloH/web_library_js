const express = require('express');
var path = require('path');

const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const app = express();
const authTokens = {};

var users = [];




const hbs = require("hbs");


app.set("view engine", "hbs");
app.use(express.static(__dirname + "/views"));

hbs.registerPartials(__dirname + "/views");





 
// Read Mongodb 

var MongoClient = require('mongodb').MongoClient;

var  rst="";

const url = `mongodb+srv://mongo21:mongo21mongo21@cluster0.7l5pq.mongodb.net/sample_mflix?retryWrites=true&w=majority`;

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Book");


 
console.log(dbo.collection("Clients").find( { IDBooksBorrowed: "44444" } ));
 
  dbo.collection("Books").find({}, { 
         projection: { Title: 1, ID:2, Available:3, Author:4} }).toArray(function(err, result) {
    if (err) throw err;
    rst=result;



    
    db.close();
  });

});





// Read Json file
const fs3 = require('fs');

 

fs3.readFile(path.resolve(__dirname, 'users.json'), 'utf8', (error, data) => {
     if(error){
        console.log(error);
        return;
     }

  users  = JSON.parse(data);

    var myjsons= users;
    console.log(myjsons);

})




const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex');
}






 


 











app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use((req, res, next) => {
    const authToken = req.cookies['AuthToken'];
    req.user = authTokens[authToken];
    next();
});



//var hbs = exphbs.create({ /* config */ });

// Register `hbs.engine` with the Express app.
//app.engine('handlebars', hbs.engine);
//app.set('view engine', 'handlebars');

 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');




app.get('/', (req, res) => {
    res.render('home');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
   









 const { email, password } = req.body;


    const user = users.find(u => {
        return u.email === email && u.password ==password 
    });



console.log(user);

    if (user) {
        const authToken = generateAuthToken();

        authTokens[authToken] = email;

        res.cookie('AuthToken', authToken);
        res.redirect('/userprofile');
        return;
    } else {
        res.render('login', {
            message: 'Invalid username or password',
            messageClass: 'alert-danger'
        });
    }
});



app.get('/register', (req, res) => {
    res.render('register');
});


app.post('/register', (req, res) => {



    const { email, firstName, lastName, password, confirmPassword } = req.body;

    if (password === confirmPassword) {
        if (users.find(user => user.email === email)) {

            res.render('register', {
                message: 'User already registered.',
                messageClass: 'alert-danger'
            });
            return;
        }

        














// Add new element in Json file
const fs3 = require('fs');

// fs.readFile(path.resolve(__dirname, 'settings.json'), 'UTF-8', callback);



fs3.readFile(path.resolve(__dirname, 'users.json'), 'utf8', (error, data) => {
     if(error){
        console.log(error);
        return;
     }

  users  = JSON.parse(data);

    var myjsons= users;
    console.log(myjsons);




 
users.push({"email":email,"password":password});
var data2= users;
jsonStr = JSON.stringify(data2);




 

const content = jsonStr

fs3.writeFile('users.json', content, err => {
  if (err) {
    console.error(err)
    return
  }
  //file written successfully
data2="";
})

})
























        users.push({
            firstName,
            lastName,
            email,
            password
        });

        res.render('login', {
            message: 'Registration Complete. Please login to continue.',
            messageClass: 'alert-success'
        });
    } else {
        res.render('register', {
            message: 'Password does not match.',
            messageClass: 'alert-danger'
        });
    }
});

app.get('/userprofile', (req, res) => {
   
 if (req.user) {


       // res.render('userprofile');


var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb+srv://mongo21:mongo21mongo21@cluster0.7l5pq.mongodb.net/sample_mflix?retryWrites=true&w=majority';







MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Book");
  /*Return only the documents where the address starts with an "S":*/



  var query = { Available: { $in: ['false'] } };
  dbo.collection("Books").find(query).toArray(function(err, booklist1) {
    if (err) throw err;
    console.log(  booklist1 );







// Read clients from MongoDB from Clients

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Book");
  /*Return only the documents where the address starts with an "S":*/



  var query = { UserName: { $in: [req.user] } };
  dbo.collection("Clients").find(query).toArray(function(err, result1) {
    if (err) throw err;
    console.log( result1[0] );








// Showing Borrowed-Books for clients from Books

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("Book"); 

  var query = { ID: { $in: [result1[0].IDBooksBorrowed]  } };
  dbo.collection("Books").find(query).toArray(function(err, result2) {
    if (err) throw err;
    console.log(result2);


 

res.render('userprofile', {
            message:  rst,
            welcome_useremail: req.user,
            BookBorrowed1: JSON.stringify(result2[0]),
           messageClass: 'alert-danger'
        });

 
 
    db.close();
  });
});



    db.close();
  });
});





    db.close();
  });
});







  } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});






app.listen(process.env.PORT || 5000);
