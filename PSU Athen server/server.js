require("tls").DEFAULT_MIN_VERSION = "TLSv1";
const express = require("express");
const soap = require("soap");
const bodyParser = require("body-parser");
const url ="https://passport.psu.ac.th/authentication/authentication.asmx?wsdl";
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken");


app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/psu_auth",(req,res)=>{
    res.json([{"username":"PSU Passport","password":"PSU Password"}])
})
app.post("/psu_auth", (req, res) => {
  soap.createClient(url, (err, client) => {
    if (err) console.log(err);
    else {
      let user = {};
      user.username = req.body.username;
      user.password = req.body.password;
      // check data
      client.GetStaffDetails(user, (err, response) => {
        if (err) console.error(err);
        else {
        //   console.log(response);
          const PSU_PASSPORT ={
               stID:    response.GetStaffDetailsResult.string[0],
               firstname:   response.GetStaffDetailsResult.string[1],
               lastname: response.GetStaffDetailsResult.string[2],
               P_Id:   response.GetStaffDetailsResult.string[3],
               year:    response.GetStaffDetailsResult.string[4],
          }
          if(PSU_PASSPORT.stID!==""){
              jwt.sign({PSU_PASSPORT}, 'secretkey', { expiresIn: '240s' }, (err, token) => {
                  PSU_PASSPORT.token= token;
              res.json({
            //   token
                PSU_PASSPORT
            });
          });
          }
          else{
             res.json({"massage":"Login Fail"})   
          }

        }
      });
    }
  });
});
const PORT = process.env.PORT || 80
app.listen(PORT, () => console.log("SERVER IS RUNNING ON ", PORT));