// load the things we need
var express = require("express");
var app = express();

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

// use res.render to load up an ejs view file

// index page
app.get("/", (req, res) => {
  res.render("pages/projectList", {
    projects: projects
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
