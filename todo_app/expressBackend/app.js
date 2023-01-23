const express = require("express");
const bodyParser = require("body-parser");
const client = require("./connection.js");
// const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
// dotenv.config();
const port = "4010";
app.use(bodyParser.json());
// var corsOptions = {
// 	origin: "http://127.0.0.1:5173/",
// };

app.options("*", cors());
// client.connect();
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/users", client.createdata);
app.get("/data", client.getData);
app.get("/:id", client.getDataById);
app.put("/data/:id", client.updatedata);
app.delete("/data/:id", client.deletedata);

app.listen(port, () => {
	console.log(`server listening at port : ${port}`);
});
