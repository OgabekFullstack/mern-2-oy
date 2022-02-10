const {sing, verify, JsonWebTokenError, sign } = require("jsonwebtoken");

module.exports.generateJWTToken =(data) => {
    try {
        return sign(data, "SECRET_WORD")
    } catch (err)  {
        return false
    }
}

module.exports.checkJWTToken = (token) => {
    try {
        return verify(token, "SECRET_WORD")
    } catch (err) {
        return false
    }
}