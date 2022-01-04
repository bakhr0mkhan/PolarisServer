const publicRoutes = {
  // users routes
  "GET /users/findAll": "userController.findAll",
  "GET /users": "userController.findOne",
  "POST /users/create": "userController.create",
  "POST /users/delete": "userController.destroy",
  "POST /users/update": "userController.update",
  // posts routes
  "GET /posts/findAll": "postController.findAll",
  "GET /posts": "postController.findOne",
  "POST /posts/create": "postController.create",
  "POST /posts/delete": "postController.destroy",
  "POST /posts/update": "postController.update",
};

module.exports = publicRoutes;
