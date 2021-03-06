const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const authService = require("../services/auth.service");

const userController = () => {
  const register = async (req, res) => {
    const { name, lastname, email, phoneNumber, password } = req.body;
    // Validate request
    if (!name || !phoneNumber || !password) {
      res.status(400).json({
        message: "No details provided",
      });
    }
    try {
      let saved = await User.create(req.body);
      if (saved) {
        let token = authService().issue({
          id: saved?.id,
          name: saved?.name,
          phoneNumber: saved?.phoneNumber,
        });
        console.log("THIS IS A TOKEN", token);
        return res.status(200).json(saved);
      } else res.status(500).json({ msg: "Error creating user" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error creating user",
      });
    }
  };

  const findAll = async (req, res) => {
    try {
      const users = await User.findAll();
      return res.status(200).json({ users });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const findOne = async (req, res) => {
    const { id } = req.query;
    console.log("THIS IS QUERY", req.query);
    if (!id)
      return res.status(400).json({ msg: "Bad Request: User id not provided" });
    try {
      const user = await User.findByPk(Number(id));
      if (!user) return res.status(404).json({ msg: "User not found" });
      return res.status(200).json({ user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const update = async (req, res) => {
    const { id } = req.query;

    await User.update(req.body, {
      where: { id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).json({
            message: "User was updated successfully.",
          });
        } else {
          res.status(500).json({
            message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error updating User with id=" + id,
        });
      });
  };

  const destroyAll = async (req, res) => {
    try {
      await User.destroy({
        where: {},
        truncate: false,
      });
      return res.status(200).json({ msg: "Successfully deleted" });
    } catch (err) {
      return res.status(500).json({ msg: "Error deleting" });
    }
  };

  const destroy = async (req, res) => {
    const { id } = req.query;
    if (id) {
      try {
        const user = await User.findByPk(id);
        if (user) {
          await user.destroy();
          return res.status(200).json({ msg: "Successfully deleted" });
        } else {
          return res.status(404).json({ msg: "User not found" });
        }
      } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
      }
    }
    return res.status(400).json({ msg: "Bad Request: User id not provided" });
  };

  return {
    register,
    findAll,
    findOne,
    update,
    destroy,
    destroyAll,
  };
};

module.exports = userController;
