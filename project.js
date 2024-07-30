const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
app.use(express.json());

const jwtPassword = "123456";   // this is the password that needs to be there to verify the Jason token or Authorization token

const ALL_USERS = [{
    username: "Bhatinikhil709@gmail.com",
    password: "Nikepro",
    Name: "Nikhil bhati"

},
{
    username: "Bhatikapil709@gmail.com",   //  this all is INmemory data 
    password: "KBX",
    Name:"Kapil Bhati "
},
{
    username: "GarimaBhati123@gmail.com",
    password: "Boxer",
    Name: "Garima Bhati"
}];


function userExists(username, password){
    let userExists = false;
   for (let i =0; i<ALL_USERS.length; i++){
if(ALL_USERS[i].username == username && password == password){   // function to verify the users
    userExists = true; 
}
   }
   return userExists;
}  ;



app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
if(!userExists(username, password)){
    return res.json("User does not Exists in our memory")
}
else {
let token = jwt.sign({username:username}, jwtPassword)   // jwt.sign gives us a token
res.json(`Token --   ${token}`)
}
});



app.get("/users", function(req, res){
    const token = req.headers.authorization;
    const decode = jwt.verify(token, jwtPassword);  // takes 2 params, one the token and one the password to verify the token 
    const username = decode.username;
    res.json("desired data")
})

app.listen(3000);
