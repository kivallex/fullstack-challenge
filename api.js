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
app.get("/", async function(req, res) {
  var page = req.query.page || 1;

  if (page < 1) {
    res.redirect("/");
  }

  var response = await axios.get(
    "http://api.hackaday.io/v1/projects?api_key=" +
      hackadayAPIKey +
      "&page=" +
      req.query.page +
      "&per_page=" +
      LOAD_SIZE
  );
  var projects = response.data.projects;
  var owners = projects.map(function(project) {
    return project.owner_id;
  });

  response = await axios.get(
    "http://api.hackaday.io/v1/users/batch?api_key=" +
      hackadayAPIKey +
      "&ids=" +
      owners.join(",")
  );

  var users = response.data.users;
  var usersMap = {};

  users.forEach(function(user) {
    usersMap[user.id] = user;
  });

  projects.forEach(function(project) {
    var owner = usersMap[project.owner_id];
    if (owner) {
      project.owner = owner.screen_name;
    }
  });

  res.render("pages/projectList", {
    projects: projects.slice(0, PAGE_SIZE),
    hasNext: projects.length === LOAD_SIZE,
    hasPrev: page > 1
  });
});

// detail page
app.get("/detail/:id", async function(req, res) {
  var response = await axios.get(
    "http://api.hackaday.io/v1/projects/" +
      req.params.id +
      "?api_key=" +
      hackadayAPIKey
  );
  var project = response.data;
  var tagSearch = project.tags.join(" ");

  var response = await axios.get(
    "http://api.hackaday.io/v1/search/projects" +
      "?api_key=" +
      hackadayAPIKey +
      "&search_term=" +
      tagSearch +
      "&per_page=" +
      PAGE_SIZE
  );
  var projectResults = response.data.projects;

  var response = await axios.get(
    "http://api.hackaday.io/v1/search/users" +
      "?api_key=" +
      hackadayAPIKey +
      "&search_term=" +
      tagSearch +
      "&per_page=" +
      PAGE_SIZE
  );
  var userResults = response.data.users;

  res.render("pages/projectDetail", {
    project: project,
    recProjects: projectResults,
    recUsers: userResults
  });
});

// to get data for next/prev page
app.get("/projects", async function(req, res) {
  var response = await axios.get(
    "http://api.hackaday.io/v1/projects?api_key=" +
      hackadayAPIKey +
      "&page=" +
      req.query.page +
      "&per_page=" +
      LOAD_SIZE
  );
  var projects = response.data.projects;
  var owners = projects.map(function(project) {
    return project.owner_id;
  });

  response = await axios.get(
    "http://api.hackaday.io/v1/users/batch?api_key=" +
      hackadayAPIKey +
      "&ids=" +
      owners.join(",")
  );

  var users = response.data.users;
  var usersMap = {};

  users.forEach(function(user) {
    usersMap[user.id] = user;
  });

  projects.forEach(function(project) {
    var owner = usersMap[project.owner_id];
    if (owner) {
      project.owner = owner.screen_name;
    }
  });

  res.json({
    projects: projects.slice(0, PAGE_SIZE),
    hasNext: projects.length === LOAD_SIZE
  });
});

app.get("/owner", async function(req, res) {
  var ownerId = req.query.id;

  var response = await axios.get(
    "http://api.hackaday.io/v1/users/" + ownerId + "?api_key=" + hackadayAPIKey
  );

  res.json({
    owner: response.data
  });
});

app.listen(3000);
