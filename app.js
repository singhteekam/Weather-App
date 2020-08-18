const express= require('express');
var app= express();
var bodyParser= require('body-parser');


app.use(express.static(__dirname + '/views'));
app.engine('html', require('ejs').renderFile);
app.set("view engine", "html"); 
app.set("views", __dirname + "/views"); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/', require('./routes/server'));



app.listen(4001,()=>{
    console.log("Server is started");
});




