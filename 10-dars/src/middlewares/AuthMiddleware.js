const jwt = require("jsonwebtoken")
const { checkJWTToken } = require("../modules/jwt")

module.exports = async (req, res, next) => {
    try {

        let token = req.cookies.token
        // ../modules/jwt ga tokenni yechuvchi funksiyani export qilib qoyganmiz
        token = checkJWTToken(token)

        if(!token) {
            // agar token bo'lmasa /login page redirect qilib yuboradi
            res.redirect("/login")
            // login qilinmagan bo'lsa pasdagi kodlar unga tegishli emas return qilib yuborsak pasdagfi kodlar o'qilmaydi
            return
        }

        req.user = token

        next()
    } catch (err) {

    }
}