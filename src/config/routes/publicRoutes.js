const publicRoutes = {
  // users routes
  "GET /users/findAll": "userController.findAll",
  "GET /users": "userController.findOne",
  "POST /users/create": "userController.create",
  "POST /users/delete": "userController.destroy",
  "POST /users/update": "userController.update",
};

module.exports = publicRoutes;
