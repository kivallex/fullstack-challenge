# Fullstack Challenge

Node/Express app with EJS templating.

## Requirements

- Node.js
- Git
- SASS
- Vanilla Javascript

## Suggestions

- Express
- EJS
- Nightwatch

## Objective

Build a Node app that renders projects using Hackaday.io API.

## Progress

I was successful in building a simple Node app (with custom API that interacts with Hackaday.io API) in short time. Therefore, I was also able to write the front-end (HTML and CSS) from scratch as well. However, due to a major conflict when working with Nightwatch, I was unable to get the test command to work on my local machine (I will go more in details in the challenges section).

## Instructions

Run `npm install` to install dependencies.
Run `npm start` to start the Node app at [localhost:3000](http://localhost:3000) and build SASS.

## Challenges

Although I have used Node.js previously, I have never worked with EJS, SASS, and Nightwatch. Therefore, there was a lot for me to learn in terms of setup and development in order to complete this challenge.

Also, I have had minimal experience writing tests, which was another interesting challenge for me.

As for the issue with Nightwatch, I was unable to run Nightwatch due to `socket hang up` error. To fix this error, I tried setting up Nightwatch with numerous configurations. I have attempted to run Nightwatch on chromedriver, as well as selenium + chromedriver, by adding them as dev-dependencies (`npm install --save-dev selenium-standalone chromedriver`). I have also tried manual installations through binary files (which is under `/bin` folder currently). However, none of the solutions have worked. Therefore, I have attempted my best in writing tests under `/tests` folder.
