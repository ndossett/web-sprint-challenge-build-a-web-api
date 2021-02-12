const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const server = express();

const actionsRouter = require("./actions/actions-router");
const projectsRouter = require("./projects/projects-router");


// Complete your server here!
// Do NOT `server.listen()` inside this file!
server.use(helmet())
server.use(express.json(), morgan("dev"));
server.use("/api/actions", actionsRouter);
server.use("/api/projects", projectsRouter);


module.exports = server;
