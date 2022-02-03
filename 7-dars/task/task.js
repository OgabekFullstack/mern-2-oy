const http = require("http");
const fs = require("fs/promises")
const path = require("path")

const server  = http.createServer(async (req, res) => {
    let url = req.url
    let method = req.method
    let index = await fs.readFile("./index.html", "utf8")

    if(url === "/" && method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        })

        res.end(index)
    } else if(url === "/" && method === "POST") {
        let body = {}
        
        req.on("data", (data) => {
            let reqBody = Buffer.from(data).toString();
            reqBody = reqBody.split("&")
            reqBody.forEach((el) => {
                el = el.split("=")
                body[el[0]] = el[1]   
            })
        })

        req.on("end", async () => {
            let database = await fs.readFile("./data.json", "utf-8")
            database = await JSON.parse(database)
            users = database.users
            
            let error = users.find(
                (user) => user.name.toLowerCase() === body.name.toLowerCase()
            )

            if(error) {
                // error
                res.writeHead(400, {
                    "Content-Type": "text/json charset=utf-8" 
                })

                res.end(JSON.stringify({ "ok": "false", "message": "User already exist"}))
            } else {
                res.writeHead(201, {
                    "Content-Type": "text/json; charset=utf-8"
                })

                users.push({
                    name: body.name,
                    phone: body.phone,
                })

                await fs.writeFile("./data.json", JSON.stringify({ users }))
                res.end(JSON.stringify( {ok: true, users }))
            }
        })
    }
});

server.listen("80")
// form qilish
// Ism va telefon

// JSON da ism boyicha tekshirish
// Shunaqa ismli odam bolsa error qaytarish
// bo'lmasa JSONga yozib qoyish