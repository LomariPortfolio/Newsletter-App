//jshint esversion:6


//This app was only made to learn ExpressJS and NodeJS, feel free to contribute and make changes as you much as you want :).


//Boilerplate

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


//sending our main signup page

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

//the main logic of our application using the mailchimp api

app.post("/", (req, res) => {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };
  const jsonData = JSON.stringify(data);

//People tend to have clever placeholders for their apps, while I use only "ligma" "deez" "balls" and gibberish, I'm truly one of the developers of all time.
  const listID = '545669fa1a'
  const url = "https://us11.api.mailchimp.com/3.0/lists/" + listID;
  const options = {
    method: "POST",
    auth: "ligma:cf4365e4c02b92324789b652c704252a-us11", //replace this with your own string:api_key, the string can be anything.
  };
  const request = https.request(url, options, (response) => {

    //routing to different status pages

    if (response.statusCode === 200) {
      res.sendFile(__dirname + "/success.html");
    } else {
      res.sendFile(__dirname + "/failure.html");
    }

    //TODO: Get rid of this, it's harmless, but stupid to be in production.

    response.on("data", (data) => {
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
  //TODO: Get rid of this, it's harmless, but stupid to be in production.
  console.log(firstName, lastName, email);
});

app.post("/failure", (req, res) => {
  res.redirect("/");
});

app.listen(3000, () => {
  console.log("listening on 3000");
});

//API key: cf4365e4c02b92324789b652c704252a-us11
//List ID: 545669fa1a
