const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const server = http.createServer(async (req, res) => {
    let url = req.url;
    let method = req.method;
    let index = await fs.readFile("./index.html", "utf8");

    if(url === "/") {
        res.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",    
        });

        res.write(index);
        res.end(); 
    }

    else if(url === "/users") {
        res.writeHead(200,{
            "Content-Type": "text/json"
        });
        let users_list = await fs.readFile("./users.json");
        res.end(users_list);
    } 

    else if(url = "/new_user") {
        if(method === "POST") {
            let body = [];

            req.on("data", (data) => {
                body.push(data);
                username = Buffer.from(data).toString();
                username = username.split("&")[0].split("=")[1]; 
            });

            let users = await fs.readFile("./users.json", "utf-8");
            users_list = JSON.parse(users);
            users_list.users.forEach((user) => {

                if(user.name === username) {
                    res.writeHead(200, {
                        "Content-Type": "text/html; chharset=utf-8"
                    });
                    res.write("<h1>Bunday user mavjud<h2>");
                   
                    res.end(index);
                } else {
                    add_user()
                }

            });
            function add_user() {

                let new_user = {}
                body = body.map(data => Buffer.from(data).toString());
                body = body[0].split("&");

                for(let i = 0; i < body.length; i++) {
                    let key = body[i].split("=")[0];
                    let value = body[i].split("=")[1];
                    new_user[key] = value;
                }

                users_list.users.push(new_user);
                
                fs.writeFile("./users.json", JSON.stringify(users_list));
                console.log(users_list);
                res.end(JSON.stringify(new_user));

            }
        }
    }

   
});

server.listen(5000, console.log(`server ready`));