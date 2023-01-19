const http = require("http");
const fs = require("fs");
var requests = require("requests");

const homeFile = fs.readFileSync("home.html", "utf-8");
const replaceVal = (tempVal, orgVal) => {
	let temperature = tempVal.replace("{%tempval%}", orgVal.main.temp);
	temperature = temperature.replace("{%tempmin%}", orgVal.main.temp_min);
	temperature = temperature.replace("{%tempmax%}", orgVal.main.temp_max);
	temperature = temperature.replace("{%location%}", orgVal.name);
	temperature = temperature.replace("{%tempcnt%}", orgVal.sys.country);
	return temperature;
};
const server = http.createServer((req, res) => {
	if (req.url == "/") {
		requests(
			"https://api.openweathermap.org/data/2.5/weather?q=Pune&appid=9d7b1aeca4184a6d4b77346215338b33"
		)
			.on("data", (chunk) => {
				const objdata = JSON.parse(chunk);
				const arr = [objdata];
				//console.log(arr);
				const realTimeData = arr
					.map((val) => replaceVal(homeFile, val))
					.join("");
				res.write(realTimeData);
			})
			.on("end", (err) => {
				if (err) return console.log("connection closed due to error, err");

				res.end();
			});
	}
});
server.listen(3000, "127.0.0.1");
