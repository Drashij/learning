//........................website..................//
const path = require("path");
const express = require("express");
const app = express();
const staticPath = path.join(__dirname, "../public");

// built in middleware
app.use(express.static(staticPath)); // path of html file
app.get("/about", (req, res) => {
	res.send("hello from about");
});
app.listen(8000, () => {
	console.log("listening the port at 8000");
});
