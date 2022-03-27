const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
// Input your Mailchimp apiKey and server below
const mailchimp = require("@mailchimp/mailchimp_marketing");
mailchimp.setConfig({
  apiKey: "651ec98b5fd82abca5a69b3571df7910-us14",
  server: "us14",
});
//This is your List ID or Audience ID
const listId = "b8c7761bc7";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const firsName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const userInfo = {
    firsName: firsName,
    lastName: lastName,
    email: email,
  };

  async function run() {
    console.log(`Adding ${firsName} to Newsletter!`);
    try {
      const data = await mailchimp.lists.addListMember(listId, {
        email_address: userInfo.email,
        status: "subscribed",
        merge_fields: {
          FNAME: userInfo.firsName,
          LNAME: userInfo.lastName,
        },
      });
      res.redirect("success.html");
    } catch (error) {
      res.redirect("fail.html");
    }
  }
  run();
});
//Dynamic and local port
app.listen(process.env.PORT || port, () => {
  console.log(`Server running on port ${port}`);
});
