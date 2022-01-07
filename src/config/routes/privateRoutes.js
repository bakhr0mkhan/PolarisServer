const privateRoutes = {
  // posts routes
  "GET /posts/findAll": "postController.findAll",
  "GET /posts": "postController.findOne",
  "POST /posts/create": "postController.create",
  "POST /posts/delete": "postController.destroy",
  "POST /posts/update": "postController.update",
};

module.exports = privateRoutes;
