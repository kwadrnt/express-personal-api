// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

// var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    woopsIForgotToDocumentAllMyEndpoints: false, 
    message: "Welcome to Kevin Tse's Personal API! Here's what you need to know!",
    documentationUrl: "https://github.com/kwadrnt/express-personal-api/blob/master/README.md", 
    baseUrl: "https://dry-earth-98097.herokuapp.com/", 
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Profile Data about Me"}, 
      // Gets all nba stadiums (INDEX)
      {method: "GET", path: "/api/nbastadiums", description: "Listing ALL NBA stadiums I visited"}
      // POST route
      {method: "POST", path: "/api/nbastadiums", description: "Create a new stadium visited"},
      // GET one stadium at a time (SHOW)
      {method: "GET", path: "/api/nbastadiums/:id", description: "Get one stadium"},
      // PUT
      {method: "PUT", path: "/api/nbastadiums", description: "Update one stadium visited"},
      // DELETE
      {method: "DELETE", path: "/api/nbastadiums/:id", description: "Delete a stadium visited"}
    ]
  })
});

app.get('/api/profile', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    name: "Kevin Tse",
    githubUsername: "kwadrnt",
    githubLink: "https://github.com/kwadrnt",
    githubProfileImage: "https://avatars3.githubusercontent.com/u/20493178?v=3&u=7a2a2797c82ff865a845f17e4bbd3610e142a502&s=400",
    personalSiteLink: "http://kevinbuilt.com/",
    currentCity: "San Francisco",
    pets: [{
      name: "fayfay",
      type: "dog",
      breed: "Pekingnese"
    },
    {
      name: "dongdong",
      type: "dog",
      breed: "Pekingnese"
    }]
  })
});

app.get('/api/nbastadiums', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    nbaStadiums: [{
      name: "Staples Center",
      locaton: "Los Angeles",
      imageURL: "https://www.suiteexperiencegroup.com/wp-content/uploads/2014/02/Staples-Center-at-night.jpg",
      visited: true,  
    },
    {
      name: "Barclays Center",
      locaton: "Brooklyn",
      imageURL: "http://www.barclayscenter.com/assets/img/about-1170x450-d9c047de75.jpg",
      visited: true,
    }]
  })
});

/**********
 * SERVER *
 **********/

// listen on the port that Heroku prescribes (process.env.PORT) OR port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
