const path = require("path")
const fs = require("fs").promises
const jwt = require("jsonwebtoken");
const { generateJWTToken } = require("../modules/jwt");
// Login Route
const router = require("express").Router();

router.get("/", (req, res) => {
    res.render("login", {
        title: "Login",
    })
});
router.post("/", async (req, res) => {
    try {
        const { username, password } = req.body

        let dbPath = path.join(__dirname, "..", "db", "database.json")
        let db = await fs.readFile(dbPath, "utf-8");
        db = await JSON.parse(db)
        // findIndex index qaytaradi, false bo'lsa -1 qaytaradi
        let userIndex = db.users.findIndex(user => user.username === username.toLowerCase());
        console.log(userIndex)
        if(userIndex < 0) {
            throw new Error("User is not registered")
        }

        // true false qaytaradi
        let isPassword = db.users[userIndex].password === password
        if(!isPassword) {
            throw new Error("incorrect password")
        }
        // token yasab oldik 
        // let token = jwt.sign({
        //     fullname: db.users[userIndex].fullname,
        //     username: db.users[userIndex].username
        // }, "SECRET_WORD");

        // token yasovchi funksiyani ../modules/jwt.js ga yozib export qilib qoydik 
        let token = generateJWTToken({
            id: db.users[userIndex].id,
            fullname: db.users[userIndex].fullname,
            username: db.users[userIndex].username
        })

        // tokenni cookiega saqladik
        res.cookie("token", token).redirect("/chat")

    } catch(err) {
        res.render("login", {
            title: "Login",
            error: err + ""
        })
    } 
})

module.exports = {
    path: "/login",
    // router: router,
    router,
};
