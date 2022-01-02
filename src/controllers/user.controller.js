const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name || !req.body.phoneNumber || !req.body.password) {
    res.status(400).json({
      message: "No details provided",
    });
  }
  const user = {
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    password: req.body.password,
  };
  try {
    let saved = await User.create(user);
    if (saved) res.status(200).json(saved);
    else res.status(500).json({ msg: "Error creating user" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Error creating user",
    });
  }
};

exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ users });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.findOne = async (req, res) => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ msg: "Bad Request: User id not provided" });
  try {
    const user = await User.findByPk(id);
    return res.status(200).json({ user });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

exports.update = async (req, res) => {
  const id = req.params.id;

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

exports.destroyAll = async (req, res) => {
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

exports.destroy = async (req, res) => {
  const { id } = req.params;
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
