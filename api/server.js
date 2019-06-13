const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const users = require("../routes/user-routes");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => res.send("<h1>Something Here</h1>"));
server.use("/api/users", users);

module.exports = server;
