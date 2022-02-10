const express = require("express")
const fs = require("fs")
const path = require("path")
const CookieParser = require("cookie-parser")

const { PORT } = require("../config")

const morgan = require("morgan")

const { default: slugify } = require("slugify")

const app = express()

app.listen(PORT, _ => console.log(`SERVER READY AT PORT ${PORT}`))

// jsonlarni chiroyli qilib chiqarib beradi, extended : true ichma ich obyektlarni olib beradi
app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(CookieParser())
app.use(morgan("tiny"))

// Routes
fs.readdir(path.join(__dirname, "routes"), (err, files) => {
    if(!err){
        // console.log(files)
        files.forEach((file) => {
            let routePath = path.join(__dirname, "routes", file)
            let Route = require(routePath)
            if(Route.path && Route.router) {
                app.use(Route.path, Route.router)
            }
        })
    }
})

// let string = slugify("O’zbekistonda freelancing orqali pul ishlash uchun eng yaxshi 10 ta sayt", {
//     remove: /[*+~()?'!]/g,
//     lower: true,
//     replacement: "_" 
// })
// console.log(string)
// ozbekistonda_freelancing_orqali_pul_ishlash_uchun_eng_yaxshi_10_ta_sayt

// api
// GET /books - hamma kitoplarni chiqaradi - done
// GET /books/slug - 1-kitobni chiqaradi
// POST /books - kitobni bazaga saqlaydi - done 
// PATCH /books/1 - kitobni o'zgartiradi
// DELETE /books/1 - kitobni o'chiradi

