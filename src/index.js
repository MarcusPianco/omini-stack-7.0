const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

const server = require("http").Server(app);

const io = require("socket.io")(server);

const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://semana:semana@cluster0-1ulbh.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

app.use(
  "/files",
  express.static(path.resolve(__dirname, "..", "uploads", "resized"))
);

app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(require("./routes"));

server.listen("3333");
