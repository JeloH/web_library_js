const express = require('express');
var path = require('path');

const exphbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const crypto = require('crypto');
const app = express();
const authTokens = {};

var users = [];




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
        res.render('userprofile');
    } else {
        res.render('login', {
            message: 'Please login to continue',
            messageClass: 'alert-danger'
        });
    }
});

app.listen(process.env.PORT || 5000);

