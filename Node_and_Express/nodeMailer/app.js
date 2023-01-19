const express = require("express");
const app = express();
const port = 5000;

const sendMail = require("./controllers/sendEmail");

app.get("/", (req, res) => {
	res.send("I am a server");
});
app.get("/sendemail", sendMail); //yaha direct definition bhi loikh skte the jo sendMail.js me likhi hai

const start = async () => {
	try {
		app.listen(port, () => {
			console.log(`i am live at port no. ${port}`);
		});
	} catch (error) {}
};
start();
