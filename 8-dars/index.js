const http = require("http");
const fs = require("fs/promises")
const path = require("path");
const { measureMemory } = require("vm");

const server  = http.createServer(async (req, res) => {
    let url = req.url
    let method = req.method
    let indexPath = path.join(__dirname, "views", "index.html")
    let index = await fs.readFile(indexPath, "utf8")

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
                let user = {
                    name: body.name,
                    phone: body.phone,
                }

                users.push(user)
                await fs.writeFile("./data.json", JSON.stringify({users}));

                res.writeHead(201, {
                    "Set-Cookie": `name=${body.name}`,
                    "Content-Type": "text/html; charset=utf-8"
                });

                chatPath = path.join(__dirname, "views", "chat.html");
                chatFile = await fs.readFile(chatPath, { encoding: "utf-8"});
               
                res.end(chatFile);
            }
        });
    } else if(url === "/chat" && method === "GET") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8"
        });

        // chatPath = path.join(__dirname, "views", "chat.html");
        // chatFile = await fs.readFile(chatPath, { encoding: "utf-8"});

        // res.end(chatFile);
        let database = await fs.readFile("./data.json", "utf-8");
        database = await JSON.parse(database);
        let users = database.users;
        let me = req.headers.cookie.split("=")[1];
        let chatJsonFile = await fs.readFile("./chat.json", "utf-8");
        chatFile = await JSON.parse(chatJsonFile);
        messages = chatFile.messages;
       console.log(messages)
        
        res.end(`<!DOCTYPE html>
        <html lang="en">
        
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- Bootstrap CSS -->
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet"
                integrity="sha384-F3w7mX95PdgyTmZZMECAngseQB83DfGTowi0iMjiWaeVhAn4FJkqJByhZMI3AhiU" crossorigin="anonymous">
        
            <title>Chat page</title>
        
        </head>
        <style>
            * {
                box-sizing: border-box !important;
            }
        </style>
        
        <body>
            <div class="container vh-100 p-1">
                <div class="row h-100">
                    <div class="col-4 border border-right">
                        <h1 class="my-3">Users</h1>
                        <ul class="list-group" id="users_here">
                        ${users.map((user) =>
                             `<li class="${me.toLowerCase() === user.name.toLowerCase() ? `bg-primary text-light`: ``} list-group-item">${user.name}</li>`
                        )}
                        </ul>
                    </div>
                    <div class="col-8 d-flex flex-column h-100">
                        <div class="chat flex-grow-1 border border-primary">
                            <ul class="list-group p-3" style="overflow-y: auto;" id="messages_here">
                            ${messages.map((message) => {
                                `<li>
                                   <h5>${message.name}<h5>
                                   ${message.text}
                                   </li>`
                                }
                            )}
                            </ul>
                        </div>
                        <form action="/chat" method="POST" class="d-flex align-items-center justify-content-between my-1 py-1"
                            style="height: 60px; padding: 0 15px; border: 1px solid #ccc; ">
                            <input name="message" type="text" placeholder="Type message..."
                                class="input-control w-100 mx-1 border rounded border-info px-3 py-1">
                            <button type="submit" class="btn btn-primary" id="send_btn">Send</button>
                        </form>
                    </div>
                </div>
            </div>
        
            <!-- Option 1: Bootstrap Bundle with Popper -->
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
                integrity="sha384-/bQdsTh/da6pkI1MST/rWKFNjaCP5gBSY4sEBT38Q/9RBh9AH40zEOg7Hlq2THRZ"
                crossorigin="anonymous"></script>
            <script src="chat_front.js"></script>
        </body>
        
        </html>`);

    } else if( url === "/chat" && method === "POST") {

        let body = {};

        req.on("data", (data) => {
            data = Buffer.from(data).toString();
            body[data.split("=")[0]] = data.split("=")[1];
        });

        req.on("end", async () => {
            let name = req.headers.cookie.split("=");
            body.name = name[1];
            let chatDataPath = path.join("./chat.json");
            let chatData = await fs.readFile(chatDataPath, "utf-8");
            chatData = await JSON.parse(chatData);
            chatData.messages.push(body);
            await fs.writeFile("./chat.json", JSON.stringify(chatData));
        });
    }
});

server.listen("80")

// 1 - Login
// 2 - Login qilgan userni o'zini qaytaramiz
// 3 - Front js dan cookie storage ga userni saqlaymiz
// 4 - chat ochiladi