require("tls").DEFAULT_MIN_VERSION = "TLSv1";
const express = require("express");
const soap = require("soap");
const bodyParser = require("body-parser");
const url =
  "https://passport.psu.ac.th/authentication/authentication.asmx?wsdl";
const app = express();
const cors = require("cors");


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/psu_auth",(req,res)=>{
    res.json([{"username":"PSU Passport","password":"PSU password"}])
})
app.post("/psu_auth", (req, res) => {
  soap.createClient(url, (err, client) => {
    if (err) console.log(err);
    else {
      let user = {};
      user.username = req.body.username;
      user.password = req.body.password;
      // check data
    //   console.log(user);
      client.GetStaffDetails(user, (err, response) => {
        if (err) console.error(err);
        else {
          console.log(response);
          const [stID,firstname,lastname,P_Id,year] =response.GetStaffDetailsResult.string
          res.json({stID,firstname,lastname,P_Id,year});
        }
      });
    }
  });
});
const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log("SERVER IS RUNNING ON ", PORT));