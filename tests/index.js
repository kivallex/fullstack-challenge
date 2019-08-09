module.exports = {
  "Projects list page": function(browser) {
    browser
      .url("http://localhost:3000/")
      .waitForElementVisible("#project-grid");

    browser.expect.element("#project-grid li").count.to.equal(10);
    browser.expect.element("#prev").to.not.be.visible;
    browser.expect.element("#next").to.be.visible;
  },
  "Projects list page - page url": function(browser) {
    browser
      .url("http://localhost:3000/?page=2")
      .waitForElementVisible("#project-grid");

    browser.expect.element("#project-grid li").count.to.equal(10);
    browser.expect.element("#prev").to.be.visible;
    browser.expect.element("#next").to.be.visible;
  },
  "Projects list page - next": function(browser) {
    browser
      .url("http://localhost:3000/")
      .waitForElementVisible("#project-grid");
    browser.click("#next").pause(5000);

    browser.expect.element("#project-grid li").count.to.equal(10);
    browser.expect.element("#prev").to.be.visible;
  },
  "Projects list page - prev": function(browser) {
    browser
      .url("http://localhost:3000/?page=2")
      .waitForElementVisible("#project-grid");
    browser.click("#prev").pause(5000);

    browser.expect.element("#project-grid li").count.to.equal(10);
    browser.expect.element("#prev").to.not.be.visible;
  },
  "Project detail page": function(browser) {
    browser
      .url("http://localhost:3000/")
      .waitForElementVisible("#project-grid");
    browser.click("#project-grid li:nth-of-type(1)").pause(5000);

    browser.expect.element("#project-grid li").count.to.equal(10);
    browser.expect.element(".recommendations").to.be.visible;
    browser.expect.element(".content").to.be.visible;
  },
  after: function(browser) {
    browser.end();
  }
};
