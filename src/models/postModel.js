const Post = (sequelize, Sequelize) =>
  sequelize.define("post", {
    body: {
      type: Sequelize.STRING,
    },
    title: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.ENUM,
      values: ["police", "radar", "cctv", "construction", "other"],
      defaultValue: "other",
    },
    lat: {
      type: Sequelize.STRING,
    },
    lat: {
      type: Sequelize.STRING,
    },
  });

module.exports = Post;
