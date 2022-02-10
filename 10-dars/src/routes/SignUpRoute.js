const router = require("express").Router();
const fs = require("fs").promises
const path = require("path")
router.get("/", (req, res) => {
    // res.send("signup route ishladi");
    res.render("signup", {
        title: "SIGN UP",
    });
});

router.post("/", async (req, res) => {
    // console.log(req.body)
    try {
        // req.body dan DESCTRUCTION qildik 
    const { fullname, username, password } = req.body

    if(password.length < 7) {
        throw new Error("Parol 6 belgidan kam bo'lishi mumkin emas")
    }

    let dbPath = path.join(__dirname, "..", "db", "database.json") 
    let dbFile = await fs.readFile(dbPath, "utf-8");
    let db = JSON.parse(dbFile)
    
    let isUserExists = db.users.find(user => user.username === username.toLowerCase())

    if(isUserExists) {
        throw new Error("user already exists")
    }
    db.users.push({
        id: db.users.length + 1,
        fullname: fullname,
        username: username.toLowerCase(),
        password: password
    })

    await fs.writeFile(dbPath, JSON.stringify(db));
    
    res.redirect("/login")
    } catch(err) {
        res.render("signup", {
            title: "SIGN UP",
            error: err + ""
        })
    }
})

module.exports = {
    path: "/signup",
    router,
}