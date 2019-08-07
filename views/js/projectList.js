// when user clicks 'Next' button show the next items
var i = 0;
function next() {
  i = i + 6; // when you press next button it should show the next 6 items
  return projects[i];
}

function prev() {
  if (i > 5) {
    // if 'i' is greater than 5 (meaning it is displaying items #7-12)
    // then you move back 6
    i = i - 6;
  }
  // else you just return
  return projects[i];
}
