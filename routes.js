const routes = {
    "GET/": {
        statusCode: 200,
        headers: {
            "content-type": "text/html",
        },
        render() {
            return "<h1>Home</h1>";
        },
    },
    "GET/about": {
        statusCode: 200,
        headers: {
            "content-type": "application/json",
        },
        render() {
            return JSON.stringify({ name: "Emma", city: "Nashville"});
        },
    },
    "POST/echo": {
        statusCode: 200,
        headers: {
            "content-type": "application/json",
        },
        render(body) {
            return JSON.stringify(body);
        },
    },
    "GET/404": {
        statusCode: 404,
        headers: {
            "content-type": "text/html",
        },
        render() {
            return "<h1>404 You Seem Lost</h1><a href='/'>Go Home</a>";
        },
    },
};

/*module.exports = routes;*/
export default routes;
