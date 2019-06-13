const express = require("express");
const PostController = require("./controllers/PostController");
const multer = require("multer");
const uploadConfig = require("./config/upload");
const LikeController = require("./controllers/LikeController");
const routes = new express.Router();
const upload = multer(uploadConfig);

routes.post("/posts", upload.single("image"), PostController.store);
routes.post("/posts/:id/like", LikeController.store);

routes.get("/posts", PostController.index);

// #midlleware intercepta a rota
routes.get("/", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

module.exports = routes;
