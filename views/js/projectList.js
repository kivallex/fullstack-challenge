// when user clicks 'Next' button show the next items
function next() {
  // expecting url of http://localhost:3000?page=2
  // if no page, it means page 1
  var pageNum = Number(getParameter("page"));

  if (pageNum === 0) {
    pageNum = 1;
  }
  if (isNaN(pageNum)) {
    return;
  }

  nextPrevHandler(pageNum + 1);
}

function prev() {
  var pageNum = Number(getParameter("page"));

  if (pageNum === 0) {
    pageNum = 1;
  }
  if (isNaN(pageNum) || pageNum <= 1) {
    return;
  }

  nextPrevHandler(pageNum - 1);
}

// cache any owner metadata we retrieve
var ownerMetadataMap = {};

// get owner metadata for tooltip
function hover(event, ownerId) {
  if (ownerMetadataMap[ownerId]) {
    return populateTooltip(event.target, ownerMetadataMap[ownerId]);
  }

  fetch("/owner?id=" + ownerId)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      ownerMetadataMap[ownerId] = data.owner;
      return populateTooltip(event.target, ownerMetadataMap[ownerId]);
    });
}

// clear tooltip
function hoverout(event) {
  event.target.classList.remove("show");
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
  var loading = document.getElementById("loading");
  loading.classList.remove("hide");

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
        var project = document.createElement("li");
        project.innerHTML = `
          <img src="${projects[i].image_url}" alt="project image" />
          <div>
            <a href="/detail/${projects[i].id}">${projects[i].name}</a>
            <p class="owner" onmouseover="hover(${projects[i].owner_id})">
              ${projects[i].owner}
            </p>
            <p>${projects[i].summary}</p>
          </div>
        `;

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

      window.scrollTo(0, 0);
      loading.classList.add("hide");
    });
}

function populateTooltip(target, metadata) {
  target.classList.add("show");

  var tooltip = target.getElementsByClassName("tooltip")[0];
  if (tooltip) {
    tooltip.innerHTML = metadata.about_me;
  }
}
