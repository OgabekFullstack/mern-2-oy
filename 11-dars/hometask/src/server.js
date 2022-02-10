const express = require("express")
const  CookieParser = require("cookie-parser")
const fs = require("fs")
const path = require("path")

const { PORT } = require("../config")

const app = express()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(CookieParser())

// Routes
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if(!err) {
        files.forEach((file) => {
            let RoutePath = path.join(__dirname, "routes", file)
            let Route = require(RoutePath)
            if(Route.path && Route.router) {
                app.use(Route.path, Route.router)
            }
        })
    }
})

app.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))
