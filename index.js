const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");
const pdfDocument = require("pdfkit");

inquirer
  .prompt({
    message: "Enter GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;

    axios.get(queryUrl).then(function(res) {
        const name = res.name;
        const userImage = res.avatar_url;
        const userLocation = res.location;
        const userProfileURL = res.url;
        const userBlogURL = res.blog
        const userBio = res.bio;
        const publicRepos = Number(res.public_repos);
        const followers = Number(res.followers);
        const following = Number(res.following);
        const githubStars = res.starred_url;

        console.log(res);


      fs.writeFile("repos.txt", repoNames, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });