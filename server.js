const express = require("express");
const v1Routes = require("./v1/routes/index");
const dbconnect = require("./common/connection");

const app = express();

const port = 6000;

dbconnect();

app.use(express.json());

// 404, Not Found
// app.use((req, res) => res.error(404, "NOT_FOUND"));

app.use("/", express.static(__dirname + "/public"));
app.use("/api/", v1Routes);

// Error handling
// app.use((error, req, res, next) => {
//   console.error(error);
//   next();
//   return res.error(400, error.message || error);
// });

// Listening & Initializing
app.listen(process.env.PORT || port, async () => {
    console.log(`Environment:`, process.env.NODE_ENV);
    console.log(`Running on:`, process.env.PORT);
});