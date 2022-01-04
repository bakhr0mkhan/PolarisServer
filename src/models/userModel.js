const bcryptService = require("../services/bcrypt.service");

const hooks = {
  beforeCreate(user) {
    user.password = bcryptService().password(user.password);
  },
};

const User = (sequelize, Sequelize) =>
  sequelize.define(
    "user",
    {
      name: {
        type: Sequelize.STRING,
      },
      lastname: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      phoneNumber: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
    },
    { hooks }
  );

module.exports = User;
