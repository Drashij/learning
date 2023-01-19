//..............................node.js................................//
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
	console.log(req.url);
	if (req.url == "/") {
		res.end("hello");
	} else if (req.url == "/about") {
		res.end("hello from about");
	} else if (req.url == "/userapi") {
		fs.readFile(`${__dirname}/userApi/userapi.json`, "utf-8", (err, data) => {
			console.log(data);
			res.end(data);
		});
	} else {
		res.writeHead(404, { "content-type": "text/html" });
		res.end("<h1>error 404 </h1>");
	}
});
server.listen(8000, "127.0.0.1", () => {
	console.log("listening server");
});
