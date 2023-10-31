const express = require("express"); 
const bparser = require("body-parser"); 
const https = require("https");
const app = express(); 
const path = require("path");
const port = 3000;
const ejs = require("ejs");

app.use(bparser.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname+'/views'))); 
app.set('view engine', 'ejs');

let blog = [["Admin's blog was created", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sem augue, aliquam ut suscipit quis, ullamcorper sed tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec fermentum ante mauris, in interdum nulla vulputate vitae. Aliquam tempus lacus neque, facilisis varius leo tincidunt vitae. Nullam vulputate dui sed purus semper suscipit. Ut ornare non dolor quis bibendum. Curabitur vel est malesuada, finibus massa at, viverra massa. Quisque nec sapien sit amet justo ornare iaculis. Nunc sit amet lorem sed est dictum elementum. "], ["new's blog was created"]];
let users = ["admin", "new"]; 
let pass = ["123", "qwerty"];
let current = -1;
app.route('/blog')
    .get(function(req, res){
        res.render('main', {user:users[current], posts: blog[current]});         
    })
    .post(function(req,res){
        let newact = req.body.addPost;
        blog[current].push(newact);
        res.redirect('/blog');
    });
app.route('/add')
    .get(function(req, res){
        res.render('add', {user:users[current], posts: blog[current]});         
    })
    .post(function(req,res){
        let newact = req.body.addPost;
        blog[current].push(newact);
        res.redirect('/');
    });
app.route('/')
    .get(function(req, res){
        res.render('login', {user:users[0], pass:pass[0], user2:users[1], pass2:pass[1]});         
    })
    .post(function(req,res){
        let username = req.body.log;
        let password = req.body.pass;
        let f = false;
        for(let i=0; i< users.length; i++){
           // console.log(username + " " + password + " " + users[i] + " " + pass[i]);
            if(username==users[i]){
                if(password == pass[i]){
                    f=true;
                    current = i;
                    res.redirect('/blog');
                }
            }
        }
        if(!f){ 
            res.redirect('/');
        }
    });

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})