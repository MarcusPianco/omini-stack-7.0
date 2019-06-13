const Post = require("../models/Post");
const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

module.exports = {
  async index(req, res) {
    const posts = await Post.find().sort("-createdAt");

    return res.json(posts);
  },
  async store(req, res) {
    const { author, place, description, hashtags } = req.body;
    const { filename: image } = req.file;

    const [name] = file.split(".");
    const fileName = `${name}.jpg`;

    await sharp(req.file.path)
      .resize(500)
      .jpeg()
      .toFile(path.resolve(req.file.destination, "resized", fileName));

    fs.unlinkSync(req.file.path);

    const post = await Post.create({
      author,
      place,
      description,
      hashtags,
      image: fileName
    });

    req.io.emit("post", post);

    return res.json(post);
  }
};
