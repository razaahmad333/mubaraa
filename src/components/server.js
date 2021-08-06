// const express = require("express");
// const app = express();

// const Datastore = require("nedb");
// const database = new Datastore("database.db");
// database.loadDatabase();

// app.use(express.json());

// let userLegalInformation = {
//   isAuthenticated: !true,
//   // currentUser:,
// };

// let userProfile = {
//   userAnswers: Array(10).fill(-1),
// };

// database.find({}, (err, data) => {
//   if (err) throw err;
//   if (data.length > 0) {
//     console.log(data);
//   }
// });

// app.get("/", (req, res) => {
//   res.send("this is your app pairome yes man yes");
// });

// app.get("/getUserProfile", (req, res) => {
//   res.json(userProfile);
// });

// app.get("/a", (req, res) => {
//   res.json({ name: "ahmad do " });
// });

// app.post("/currentUserAnswers", (req, res) => {
//   console.log(req.body);
//   userProfile.userAnswers = req.body.userAnswers;
//   res.json({ name: "israr" });
// });

// app.post("/userCredential", (req, res) => {
//   userProfile.username = req.body.username;
//   userProfile.pwd = req.body.pwd;
// });

// app.post("/userDp", (req, res) => {
//   userProfile.dp = req.body.dp;
//   userProfile.keyID = Math.floor(Math.random(0, 1) * 1000);
//   userLegalInformation.isAuthenticated = req.body.isAuthenticated;
//   database.insert(userProfile);
// });

// app.get("/allUsers", (req, res) => {
//   database.find({}, (err, data) => {
//     if (err) throw err;
//     res.json(data);
//   });
// });

// app.get("/userLegalInformation", (req, res) => {
//   res.json({
//     dp: userProfile.dp,
//     isAuthenticated: userLegalInformation.isAuthenticated,
//   });
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log("server is running ......"));
