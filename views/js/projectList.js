// when user clicks 'Next' button show the next items
console.log("load");

function next() {
  // expecting url of http://localhost:3000?page=2
  // if no page, it means page 1
  var pageNum = getParameter("page");

  if (pageNum === null) {
    pageNum = 1;
  }

  pageNum++;

  fetch("/projects?page=" + pageNum)
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      var projects = data.projects;

      // if (endVal < projects.length) {
      //   startVal = startVal + 6; // when you press next button it should show the next 6 items
      //   endVal = endVal + 6;
      // }

      const projectsGrid = document.getElementById("project-grid");
      // empty the div
      projectsGrid.innerHTML = "";

      console.log(projects);

      for (var i = 0; i < projects.length; i++) {
        // <div class="col-sm-4">
        //   <a href="/detail/<%= projects[start].projectNumber %>">
        //     <h4>
        //       <%= projects[start].name %><%= projects[start].projectNumber %>
        //     </h4>
        //     <p><%= projects[start].projectDetail %></p>
        //   </a>
        // </div>

        var project = document.createElement("div");
        project.classList.add("col-sm-4");

        var projectLink = document.createElement("a");
        projectLink.href = "/detail/" + projects[i].projectNumber;

        var projectHeader = document.createElement("h4");
        projectHeader.innerHTML = projects[i].name + projects[i].projectNumber;

        var projectP = document.createElement("p");
        projectP.innerHTML = projects[i].projectDetail;

        projectLink.appendChild(projectHeader);
        projectLink.appendChild(projectP);
        project.appendChild(projectLink);
        projectsGrid.appendChild(project);
      }

      // creating unique url
      window.history.pushState({}, null, "?page=" + pageNum);
    });
}

function prev(startVal, endVal) {
  if (startVal >= 6) {
    // if 'i' is greater than 5 (meaning it is displaying items #7-12)
    // then you move back 6
    startVal = startVal - 6;
    endVal = endVal - 6;
  }
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

// var splitView = [];
// var start = 0, end = 6;
// // make this a loop so all these function as one
// splitView.push(projects.slice(start, end));

// while(start < end) {
//   // display project name, number, and detail
//   // start ++;
// };

// // dont display previous button if start === 0
// // else previous button will show and function as
// prev(){
//   start -= 6;
//   end -= 6;

//   splitView.push(projects.slice(start, end));
// };

// // dont display next button if end >= projects.length
// next(){
//   start += 6;
//   end += 6;

//   splitView.push(projects.slice(start, end));
// };
