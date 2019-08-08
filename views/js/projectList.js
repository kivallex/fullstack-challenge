// when user clicks 'Next' button show the next items
function next() {
  // expecting url of http://localhost:3000?page=2
  // if no page, it means page 1
  var pageNum = Number(getParameter("page"));

  if (pageNum === null) {
    pageNum = 1;
  }
  if (isNaN(pageNum)) {
    return;
  }

  nextPrevHandler(pageNum + 1);
}

function prev() {
  var pageNum = Number(getParameter("page"));

  if (pageNum === null) {
    pageNum = 1;
  }
  if (isNaN(pageNum) || pageNum <= 1) {
    return;
  }

  nextPrevHandler(pageNum - 1);
}

function getParameter(paramName) {
  var searchString = window.location.search.substring(1),
    i,
    val,
    params = searchString.split("&");

  for (i = 0; i < params.length; i++) {
    val = params[i].split("=");
    if (val[0] == paramName) {
      return val[1];
    }
  }
  return null;
}

function nextPrevHandler(pageNum) {
  return fetch("/projects?page=" + pageNum)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var projects = data.projects;
      var projectsGrid = document.getElementById("project-grid");
      // empty the div
      projectsGrid.innerHTML = "";

      for (var i = 0; i < projects.length; i++) {
        var project = document.createElement("div");
        project.classList.add("col-sm-4");

        var projectLink = document.createElement("a");
        projectLink.href = "/detail/" + projects[i].id;

        var projectHeader = document.createElement("h4");
        projectHeader.innerHTML = projects[i].name;

        projectLink.appendChild(projectHeader);
        project.appendChild(projectLink);
        projectsGrid.appendChild(project);
      }

      // creating unique url
      window.history.pushState({}, null, "?page=" + pageNum);

      // hide relevant button
      var prev = document.getElementById("prev");
      var next = document.getElementById("next");

      if (pageNum <= 1) {
        prev.classList.add("hide");
      } else {
        prev.classList.remove("hide");
      }

      if (!data.hasNext) {
        next.classList.add("hide");
      } else {
        next.classList.remove("hide");
      }
    });
}
