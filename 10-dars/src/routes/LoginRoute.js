// Login Route
const router = require("express").Router();

router.get("/", (req, res) => {
    res.send("Login Route ishladi");
});

module.exports = {
    path: "/login",
    router: router,
};
