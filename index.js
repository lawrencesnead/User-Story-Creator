const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");


inquirer
  .prompt({
    message: "Enter GitHub username:",
    name: "username"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}`;
      const queryUrl2 = `https://api.github.com/users/${username}/starred`; 
      axios.get(queryUrl2).then(res1 => {
          const star = res1.data[0].stargazers_count;
          console.log(star)
      
      axios.get(queryUrl).then(function (res ) {
          const name = res.data.name;
          const userImage = res.data.avatar_url;
          const userLocation = res.data.location;
          const userProfileURL = res.data.url;
          const userBlogURL = res.data.blog
          const userBio = res.data.bio;
          const publicRepos = Number(res.data.public_repos);
          const followers = Number(res.data.followers);
          const following = Number(res.data.following);
          const githubStars = res.data.starred_url;
          const job = res.data.company;
          const githubData = [`{ "name":"${name}",` +
          ` "image":"${userImage}",` +
          ` "job":"${job}",` +
          ` "profile":"${userProfileURL}",` +
          ` "blog":"${userBlogURL}",` +
          ` "bio":"${userBio}",` +
          ` "repos":"${publicRepos}",` +
          ` "followers":"${followers}",` +
          ` "following":"${following}",` +
          ` "starsURL":"${githubStars}",` +
          ` "stars":"${star}",` +
            ` "location":"${userLocation}"}`];
          const data = JSON.parse(githubData);
        
        const fs = require('fs-extra');
        const puppeteer = require('puppeteer');
        const  hbs = require('handlebars')
        const path = require('path');
          
        const compile = async function (data) {
            const filePath = path.join(process.cwd(), 'template', `data.hbs`);
            const html = await fs.readFile(filePath, 'utf-8');
            return hbs.compile(html)(data);
        };
        
        (async function () {
            try {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                const content = await compile(data);

                await page.setContent(content);
                await page.emulateMediaType('screen');
                await page.pdf({
                    path: 'mypdf.pdf',
                    format: 'A4',
                    printBackground: true
                });

                console.log('done');
                await browser.close();
                process.exit();

            } catch (e) {
                //console.log('error', e);
            }
        })();
    });
    });
});