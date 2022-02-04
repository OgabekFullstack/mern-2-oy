const express = require("express"); //importing express framework
const server = express(); // invoking express function so that we can use express features
const path = require("path");
const fs = require("fs/promises");
const axios = require("axios")

const config = require("../config")//config ni import qilyapmiz

const cookieParser = require("cookie-parser")

// MIDDLEWARE 
server.use(cookieParser()) //cookie larni yechib beradi

// server.use("/start_here", express.static( path.join(__dirname, "public"))) //static papkani aniqlash. 1-argumenti shart emas. Agar yozilsa, shu endpointdan keyin statik papka boshlanganini bildiradi. Masalan "start_here/main.js" => public>main.js ni bildiradi. Agar hech nima yozilmasa, "localhost:5000/" olinib ketadi. U shunchaki endpoint nomi, unaqa direktoriya mavjud bo'lmasligi mn.
server.use(express.static(path.join(__dirname, "public"))) //shunda bizga src="/main.js" deyish yetarli. O'zi topvoladi
server.use(express.json()) //must have => body ni json qilvolib yechish uchun
server.use(express.urlencoded({ extended: true })) // must have => body+url ni yechib beradi

// custom middleware
server.use(async (req, res, next) => {
    // console.log("middleware ishladi");
    let count = await fs.readFile(path.join(__dirname, "public", "data.txt"), "utf-8");
    res.count = ++count; //yangi prop ochdik
    await fs.writeFile(path.join(__dirname, "public", "data.txt"), `${count}`)
    next()//bu keyingi etpga o'tkazadi
})
// check cookies for existing user
// server.use((req, res, next) => {
//    if(req.cookies.currentUser){
//        req.username = req.cookies.name;
//        next()
//    }else{
//        res.redirect("/login")
//    }
// })

// EJS settings
server.set("view engine", "ejs") //ejs ni install qigandan keyin import qilish shart emas. Nastroykasini shunday to'g'irlab qo'ysak bo'ldi
server.set("views", path.join(__dirname, "views")) //views papkasini joyini korsatib qoyish kk. Aks holda __dirname dan default qidiradi

// GET request handler
server.get("/", async (req, res) => {
    console.log(req.url, "ga so'rov yuborildi");
    // BULARDAN FAQAT BITTASINI ISHLATISH MN : 
    // res.send("send qilindi")
    // res.end("bu ham send qiladi")
    // res.status(200).json({ "ok": true }) //status larni shunday yozamiz expressda

    // saytni fetch qilib keyin render qilish
    // let site = await axios.get("https://eskiz.uz");
    // site = site.data;
    // site = site.replace(new RegExp("/assets", 'g'), "https://eskiz.uz/assets");
    // await fs.writeFile(path.join(__dirname, "views", "index.ejs"), site)

    res.render("index", { //ejs file ni render qilish
        page_visit: res.count
    })

})
// POST request handler
server.post("/", (req, res) => {
    console.log(req.body);
    // res.redirect("/shu_yerga_bor");

    res.cookie("currentUser", req.body.username) //set new cookie
    res.status(201).json(req.cookies.currentUser) //access new cookies
})

server.listen(config.PORT, () => {
    console.log(`server is ready at ${config.PORT}`);
})
// // DESCTRUCTION

// const obj = {
//     x: 1,
//     y: 2,
// }

// let { x, y } = obj;
// console.log(x, y);


// request - so'rov
// response - javob
// GET - ma'lumot olish
// POST - ma'lumot olish
// PUT - update
// PATCH - update
// DELETE - o'chirish

// ejs - embedded javascript