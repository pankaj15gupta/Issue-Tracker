const express = require("express");

const app = express();

const port = 8000;
const db = require('./config/mongoose');
const path = require('path');
const expressLayouts = require("express-ejs-layouts");


app.use(express.urlencoded());
app.use(express.static('assets'));
app.use(expressLayouts);

// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// use express routes

app.use('/', require('./routes'));


app.listen(port,function(err){
    if(err){
        console.log("Error in running the server ",err);
        return;
    }

    console.log("Server is up and running ");
});