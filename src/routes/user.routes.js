module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();
  router.post("/create", users.create);
  router.get("/findAll", users.findAll);
  router.get("/", users.findOne);
  router.post("/update", users.update);
  router.post("/delete", users.destroy);
  //   router.post("/", users.destroyAll);
  app.use("/api/users", router);
};
