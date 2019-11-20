// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;  

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    console.log('path is this:'+path + 'dirname is this:'+__dirname);
    res.sendFile(path.join(__dirname, "index.html"));
  });  

  app.get("/notes", function(req, res) {
    // res.send("Welcome to the Star Wars Page!")
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  // Displays all characters
  app.get("/api/notes", function(req, res) {
    return res.json({
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi ffffffffMaster",
        age: 900,
        forcePoints: 2000
      });
  });
  
  
// Create New Characters - takes in JSON input
app.post("/api/notes", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newNote = req.body;
  
    // Using a RegEx Pattern to remove spaces from newNote
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newNote.routeName = newNote.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    characters.push(newNote);
  
    res.json(newNote);
  });
  
  
// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  