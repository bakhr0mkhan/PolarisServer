const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mapRoutes = require("express-routes-mapper");
const app = express();

var corsOptions = {
  origin: "http://localhost:2022",
};

app.use(cors(corsOptions));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");
db.sequelize.sync();

/*
uncomment to drop db 
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/
const mappedOpenRoutes = mapRoutes(
  require("./src/config/routes/publicRoutes"),
  "src/controllers/"
);
app.use("/api", mappedOpenRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 1304;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
