/*console.log("Hello World!\n==========\n");

console.log("EXERCISE 1:\n==========\n");

const http = require("http");
http.createServer(function (request,response){
    let {url} = request;
    let chunks = [];
    request.on("data", function(chunk){
        chunks.push(chunk);
        request.on("end", function() {
            const body = Buffer.concat(chunks).toString();
            const wildcard = {
                make: "Aston Martin",
                model: "V12 Speedster",
              };

              const about = {
                name: "Elizabeth",
                favColor: "mermaid aqua",
              };


            if (url === "/") {
                response.write(JSON.stringify(wildcard));
            } else if (url === "/about") {
                response.write(JSON.stringify(about));
            } else if (url === "/echo") {
                response.write(body);
            }
         });
    })

})
.listen(3000, function () {
    console.log("Server listening on port 3000...");
  });
*/

"use strict";

const http = require("http");

const { requestHandler } = require("./handlers");

const matchRoute = (endpoint) => {
    let data = {
        statusCode: 200,
        content: null,
    };

    switch (endpoint) {
        case "/":
        data.content = "<h1>Home</h1>";
        break;
        case "/about":
        data.content = "<h1>About</h1>";
        break;
        case "/projects":
        data.content = "<h1>Projects</h1>";
        break;
        default:
        data.content = "<h1>Page not found</h1><a href='/'>Redirect</a>";
        data.statusCode = 404;
    }

    return data;
};

const server = http.createServer((req, res) => {
    req.on("error", (err) => {
        console.error(err);
        res.writeHead(400, { "content-type": "application/json" });
        res.write(JSON.stringify({ msg: "Invalid request", err }));
        res.end();
    });
    res.on("error", (err) => {
        console.error(err);
        res.writeHead(500, { "content-type": "application/json" });
        res.write(JSON.stringify({ msg: "Server error", err }));
        res.end();
    });

    if (req.method != "GET") {
        const chunks = [];

        req.on("data", (chunk) => chunks.push(chunk));
        req.on("end", () => {
        let reqBody = JSON.parse(Buffer.concat(chunks).toString());

        res.writeHead(200, { "content-type": "text/html" });
        res.write(`success: ${reqBody.test}`);
        res.end();
        });
    } else {
        let { statusCode, content } = matchRoute(req.url);
        res.writeHead(statusCode, { "Content-Type": "text/html" });
        res.write(content);
        res.end();
    }
});

server.listen(5000, () => console.log("Server running at port 5000..."));
