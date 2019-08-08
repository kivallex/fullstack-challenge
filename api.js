// load the things we need
var express = require("express");
var path = require("path");
var axios = require("axios");
var app = express();

// temporary solution
var hackadayAPIKey = "SD3xfuN4z7CcduPI";
var PAGE_SIZE = 10;
var LOAD_SIZE = 11;

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

// use res.render to load up an ejs view file

// index page
app.get("/", async function(_, res) {
  var response = await axios.get(
    "http://api.hackaday.io/v1/projects?api_key=" +
      hackadayAPIKey +
      "&per_page=" +
      LOAD_SIZE
  );
  var projects = response.data.projects;

  response = await axios.get(
    "http://api.hackaday.io/v1/users/" +
      projects.owner_id +
      "?api_key" +
      hackadayAPIKey
  );

  res.render("pages/projectList", {
    projects: projects.slice(0, PAGE_SIZE),
    hasNext: projects.length === LOAD_SIZE
  });
});

// to get data for next/prev page
app.get("/projects", function(req, res) {
  // pagintation
  // sent from front-end, decremented since array starts at 0
  var page = req.query.page;
  page--;

  axios
    .get(
      "http://api.hackaday.io/v1/projects?api_key=" +
        hackadayAPIKey +
        "&page=" +
        page +
        "&per_page=" +
        LOAD_SIZE
    )
    .then(function(response) {
      // page = 2
      var projects = response.data.projects;

      res.json({
        projects: projects.slice(0, PAGE_SIZE),
        hasNext: projects.length === LOAD_SIZE
      });
    });
});

// detail page
app.get("/detail/:id", function(req, res) {
  axios
    .get(
      "http://api.hackaday.io/v1/projects/" +
        req.params.id +
        "?api_key=" +
        hackadayAPIKey
    )
    .then(function(response) {
      var projects = response.data.projects;
    });

  res.render("pages/projectDetail", {
    name: project.name,
    number: project.projectNumber,
    detail: project.projectDetail
  });
});

app.listen(3000);
console.log("3000 is the ugly port");
