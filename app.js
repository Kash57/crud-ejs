
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

app.set('view engine', 'ejs');
app.set('views', 'views');
const db = require('./database');


db.connect((err) => {
    if (!err)
      console.log('DB Connection Succeded.');
    else
      console.log('DB Connection Failed \n Error:' + JSON.strigyfy(err,undefined,2));
});





var User = [];

app.get('/', (req,res) => {
    res.render('reg');
});

//insert
app.post('/add', (req,res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email= req.body.email;
  //var phonenumber = req.body.phonenumber;
  var address = req.body.address;
  //var dob= req.body.dob;
  var sql =`insert into customer(fname,lname,email,address) values('${fname}','${lname}','${email}','${address}')`;
   db.query(sql,function(err,results) {
   if (err) throw err;
   res.send("<h1>data sent...</h1>");
   });
});       
         
        

//get
app.get('/users', function(req,res){
    var sql = `select * from customer`;
    db.query(sql,function(err,results) {
        if (err) throw err;
        res.render('data',{users:results});
    });
});

// delete
app.get('/delete/:id', (req,res) => {
     var id = req.params.id;
     var sql = `delete from customer where id='${id}'`;
     db.query(sql,function(err,results) {
      if (err) throw err;
      res.redirect('/users');
     });
});

//edit
app.get('/edit/:id',function(req,res){
    var id = req.params.id;
    var sql = `select * from customer where id='${id}'`;
    db.query(sql,function(err,results) {
      if (err) throw err;
      res.render('edit',{users:results});
     });
});

//update
app.post('/update/:id',function(req,res){
     var id = req.params.id;
     var fname = req.body.fname;
        var lname = req.body.lname;
        var email= req.body.email;
        var address = req.body.address;
        var dob= req.body.dob;
        var sql =`update customer set fname='${fname}',lname='${lname}',email='${email}',address='${address}' where id='${id}'`;
        db.query(sql,function(err,results) {
          if (err) throw err;
          res.redirect('/users');
         });
});






app.listen(8800);


