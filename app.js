// libs
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mapRoutes = require("express-routes-mapper");
const helmet = require("helmet");

// local
const auth = require("./src/policies/auth.policy");
// init
const app = express();

// cors
var corsOptions = {
  origin: "http://localhost:2022",
};
app.use(cors(corsOptions));

// helmet
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db
const db = require("./src/models");
db.sequelize.sync();

// jwt middleware to protect private routes
app.all("/api/private/*", (req, res, next) => auth(req, res, next));
// all routes stuff
const mappedOpenRoutes = mapRoutes(
  require("./src/config/routes/publicRoutes"),
  "src/controllers/"
);
const mappedPrivateRoutes = mapRoutes(
  require("./src/config/routes/privateRoutes"),
  "src/controllers/"
);
app.use("/api/public", mappedOpenRoutes);
app.use("/api/private", mappedPrivateRoutes);

// drop db
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

// port
const PORT = process.env.PORT || 2022;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
