// const AuthMiddleware = require("../middlewares/AuthMiddleware");

// const router = require("express").Router();
// const path = require("path");
// const fs = require("fs")
// // Home page himoyalash uchun 
// router.use(AuthMiddleware)

// router.get("/:id", async (req, res) => {
//     try {
//         const id = req.params.id - 0

//         let dbPath = path.join(__dirname, '..', "db", "database.json")
//         let dbFile = await fs.readFile(dbPath, "utf-8")
//         let db = await JSON.parse(dbFile)
        
//         // meni id = 1
//         // men yozishadigan odamni id'si 2

//         // message.from=1; message.to=2
//         // message.from=2; message.to=1

//         let messages = db.messages.filter(message => (message.from === req.user.id && message.to === id) || (message.to === req.user.id && message.from === id))
        
//         res.render("index", {
//             title: "HOME",
//             messages,
//             users: db.users,
//             me: req.use
//         })

//     } catch (err) {
         
//     }
// })

// router.post("/:id", async (req, res) => {
//     // res.send("home route ishladi");
//     try {
//         const { id } = req.params
//         const { text } = req.body
        
//         let dbPath = path.join(__dirname, '..', "db", "database.json")
//         let dbFile = await fs.readFile(dbPath, "utf-8")
//         let db = await JSON.parse(dbFile)

//         let message = {
//             id: db.users.length + 1,
//             to: id,
//             from: req.user.id,
//             text
//         }

//         db.messages.push(message)

//         await fs.writeFile(dbPath, JSON.stringify(db));
        
//         res.redirect("/home/" + id);
        
//     } catch(err) {
//         res.send("index", {
//             title: "HOME",
//             error: err + ""
//         })
//     }
// })


// module.exports = {
//     path: "/home", 
//     router,
// }
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const path = require("path");
const fs = require("fs").promises

const router = require("express").Router();

router.use(AuthMiddleware)

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id - 0

        let dbPath = path.join(__dirname, '..', "db", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        // mani id = 1
        // man yozishadigan odamn id'si 2

        // message.from = 1 message.to = 2
        // message.from = 2 message.to = 1

        let messages = db.messages.filter(message => (message.from === req.user.id && message.to === id) || (message.to === req.user.id && message.from === id))

        res.render("index", {
            title: "CHAT",
            messages,
            users: db.users,
            me: req.user,
            id
        })

    } catch(e) {

    }
});

router.post("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        let dbPath = path.join(__dirname, '..', "db", "db.json");
        let dbFile = await fs.readFile(dbPath, "utf-8");
        let db = await JSON.parse(dbFile);

        let message = {
            id: db.messages.length + 1,
            from: req.user.id,
            to: parseInt(id),
            text
        }

        db.messages.push(message);

        await fs.writeFile(dbPath, JSON.stringify(db))

        res.redirect("/chat/"+id);

    } catch(e) {
        res.render("index", {
            title: "CHAT",
            error: e + ""
        })
    }
})

module.exports = {
    path: "/chat",
    router,
};