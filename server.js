// Dependencies
// =============================================================
var express = require("express");
var path = require("path");
var fs = require('fs');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;  

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = require('./db.json');
// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page

  app.get("/", function(req, res) {
    res.json(path.join(__dirname, "/public/index.html"));
  });

  app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  // Displays all characters
  app.get("/api/notes", function(req, res) {
    return res.json(db);
  });
  
// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
    newNote.id = parseInt(db[db.length-1].id)+1;
  // crbtemp may need to add an id to the note here, notearray.lenght will suffice
    console.log(newNote);
    db.push(newNote);
   
    fs.writeFile('db.json', JSON.stringify(db), (suc, err) => {
      if (err) { 
        return console.log(err);
      }
    });
  
    res.json(newNote);
  });
  
  app.delete('/api/notes/:id',(req, res) => {
    const id = req.params.id;
    console.log(id);
    const noteDelete = db.findIndex(element => parseInt(element.id)=== parseInt(id));
    db.splice(noteDelete, 1);
    fs.writeFile('db.json', JSON.stringify(db), (suc, err) => {
      if (err) { 
        return console.log(err);
      }
      res.sendStatus(200);
    });
  });
  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
