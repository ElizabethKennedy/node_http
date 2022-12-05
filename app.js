console.log("Hello World!\n==========\n");

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
