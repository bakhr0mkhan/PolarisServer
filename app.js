const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

var corsOptions = {
  origin: "http://localhost:1304",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Home route." });
});

const db = require("./src/models");
db.sequelize.sync();

/*
for resyncing in development mode
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/

require("./src/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1304;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
