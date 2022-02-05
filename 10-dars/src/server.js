const express = require("express");
const CookieParser = require("cookie-parser");
const path = require("path");

const LoginRoute = require("./routes/LoginRoute");

const { PORT } = require("../config");



const server = express();

// Middlewares
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(CookieParser());
server.use(express.static(path.join(__dirname, "public")));
// Settings
server.set("view engine", "ejs");
server.set("views", path.join(__dirname, "public"));

// Request listener 
// server.use("/", router);
server.use(LoginRoute.path, LoginRoute.router)


server.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))