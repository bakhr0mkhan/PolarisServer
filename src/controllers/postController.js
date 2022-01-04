const db = require("../models");
const Post = db.posts;

const postController = () => {
  const create = async (req, res) => {
    const { body, title, type, lat, long } = req.body;
    // Validate request
    if (!lat || !long) {
      res.status(400).json({
        message: "No details provided",
      });
    }

    try {
      let post = await Post.create(req.body);
      if (post) res.status(200).json({ post });
      else res.status(500).json({ msg: "Error creating post" });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Error creating post",
      });
    }
  };

  const findAll = async (req, res) => {
    try {
      const posts = await Post.findAll();
      return res.status(200).json({ posts });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const findOne = async (req, res) => {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ msg: "Bad Request: Post id not provided" });
    try {
      const post = await Post.findByPk(Number(id));
      if (!post) return res.status(404).json({ msg: "Post not found" });
      return res.status(200).json({ post });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: "Internal server error" });
    }
  };

  const update = async (req, res) => {
    const { id } = req.query;
    await Post.update(req.body, {
      where: { id },
    })
      .then((num) => {
        if (num == 1) {
          res.status(200).json({
            message: "Post was updated successfully.",
          });
        } else {
          res.status(500).json({
            message: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          message: "Error updating Post with id=" + id,
        });
      });
  };

  const destroyAll = async (req, res) => {
    try {
      await Post.destroy({
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
        const post = await Post.findByPk(id);
        if (post) {
          await post.destroy();
          return res.status(200).json({ msg: "Successfully deleted" });
        } else {
          return res.status(404).json({ msg: "Post not found" });
        }
      } catch (err) {
        return res.status(500).json({ msg: "Internal server error" });
      }
    }
    return res.status(400).json({ msg: "Bad Request: Post id not provided" });
  };

  return {
    create,
    findAll,
    findOne,
    update,
    destroy,
    destroyAll,
  };
};

module.exports = postController;
