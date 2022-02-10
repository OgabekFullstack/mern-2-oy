require("dotenv").config()

let {env} = process

module.exports = {
    PORT: env.PORT,
}