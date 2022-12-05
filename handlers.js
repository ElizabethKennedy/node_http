const routes = require("./routes");

const errorHandler = (err, req, res) => {
    console.error(err);

    res.writeHead(err.status, { "content-type": "text/html" });
    res.write(`<h1>ERROR: ${err.message}</h1>`);
    res.end();
};

const requestHandler = (req, res) => {
    const { url, method } = req;
    const chunks = [];

    req.on("error", (err) => {
        err.status = 400;
        errorHandler(err, req, res);
    });

    res.on("error", (err) => {
        err.status = 500;
        errorHandler (err, req, res);
    });

    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
        let reqBody = Buffer.concat(chunks).toString();

        try {
            reqBody = JSON.parse(reqBody);
        } catch (err) {
            console.error(err);
            reqBody = {};
        } finally {
            reqBody.url = url;
            reqBody.method = method;
        }

        let route = routes[method + url] || routes["GET/404"];

        res.writeHead(route.statusCode, route.headers);
        res.write(route.render(reqBody));
        res.end();
    });
};

module.exports = {
    requestHandler,
};
