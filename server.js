const express = require("express");
const bodyParser = require("body-parser");

// db
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");

// create express app
const serverApp = express();

// parser request of content-type - application/x-www-form-urlencoded
serverApp.use(bodyParser.urlencoded({
    extended: true,
}));

// parse requests of content-type - application/json
serverApp.use(bodyParser.json());

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
}).then(() => {
    console.log("You're connected to the DB.")
}).catch( err => {
    console.log(err);
    process.exit();
});

//define a route
serverApp.get('/', (req, res) => {
    res.json({
        message: "Welcome to EasyNotes App."
    });
});

// App routes
require('./app/routes/note.routes')(serverApp);

//listen request port
serverApp.listen(4000, () => {
    console.log("Server is listening on port 4000");
});