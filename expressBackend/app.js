const express = require("express");
const bodyParser = require("body-parser");
const client = require("./connection.js");
// const dotenv = require("dotenv");
const cors = require("cors");

const app = express();

const port = "4010";
app.use(bodyParser.json());

app.options("*", cors());

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});

app.post("/tasks/:id", client.createdata);

app.put("/data/:id", client.updatedata);
app.delete("/deleteTask/:id", client.deletedata);

app.get("/tdata/:id", client.gettask);
app.post("/users/login", client.getlogin);
app.post("/users/register", client.tempPost);
app.get("/details/:id", client.getDetailsById);

app.listen(port, () => {
	console.log(`server listening at port : ${port}`);
});
