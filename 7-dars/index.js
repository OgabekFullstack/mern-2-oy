// HTTP
const http = require("http");

const server = http.createServer((request, response) => {
    console.log(request.url);
});

server.listen(80);
