// load the things we need
var express = require("express");
var path = require("path");
var app = express();

// temporary solution
var hackadayAPIKey = "SD3xfuN4z7CcduPI";

// fake project information
var projects = [
  { name: "Project #", projectNumber: 1, projectDetail: "random" },
  { name: "Project #", projectNumber: 2, projectDetail: "random" },
  { name: "Project #", projectNumber: 3, projectDetail: "random" },
  { name: "Project #", projectNumber: 4, projectDetail: "random" },
  { name: "Project #", projectNumber: 5, projectDetail: "random" },
  { name: "Project #", projectNumber: 6, projectDetail: "random" },
  { name: "Project #", projectNumber: 7, projectDetail: "random" },
  { name: "Project #", projectNumber: 8, projectDetail: "random" },
  { name: "Project #", projectNumber: 9, projectDetail: "random" },
  { name: "Project #", projectNumber: 10, projectDetail: "random" },
  { name: "Project #", projectNumber: 11, projectDetail: "random" }
];

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "views")));

// use res.render to load up an ejs view file

// index page
app.get("/", (req, res) => {
  res.render("pages/projectList", {
    projects: projects
  });
});

// to get data for next/prev page
app.get("/projects", (req, res) => {
  // pagintation
  // sent from front-end
  var page = req.query.page;
  page--;

  // page = 2
  const range = projects.slice(page * 6, page * 6 + 6);

  res.json({
    projects: range
  });
});

// detail page
app.get("/detail/:projectNumber", (req, res) => {
  // find the certain project from projects
  var project = projects.filter(project => {
    return project.projectNumber == req.params.projectNumber;
  })[0];

  res.render("pages/projectDetail", {
    name: project.name,
    number: project.projectNumber,
    detail: project.projectDetail
  });
});

app.listen(3000);
console.log("3000 is the ugly port");
