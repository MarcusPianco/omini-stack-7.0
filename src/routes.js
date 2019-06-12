const express = require("express");
const PostController = require("./controllers/PostController");

const routes = new express.Router();

routes.post("/posts", PostController.store);

// #midlleware intercepta a rota
routes.get("/", (req, res) => {
  return res.send(`Hello ${req.query.name}`);
});

module.exports = routes;
