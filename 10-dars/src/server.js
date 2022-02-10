const express = require("express");
const CookieParser = require("cookie-parser");
const path = require("path");
const fs = require("fs");
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
server.set("views", path.join(__dirname, "views"));
  
// Request listener
// server.use("/", router);
// server.use(LoginRoute.path, LoginRoute.router)
// Har yangi route ochilganda server.use qilmaslik uchun =>
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        // console.log(files); routes papkaani ichidagi barcha filelarni o'qib olyabmiz
        files.forEach((file) => {
            let routePath = path.join(__dirname, "routes", file);
            let Route = require(routePath);
            if(Route.path && Route.router) {
                server.use(Route.path, Route.router); 
            }
        })
    }
})


server.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))