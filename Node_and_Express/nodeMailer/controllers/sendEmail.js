const nodemailer = require("nodemailer");
const sendMail = async (req, res) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		//secure:false, // true for 465, false for others
		auth: {
			user: "kenyatta.witting@ethereal.email", // generated from ethereal(chrome)->createaccount
			pass: "augVrJCr1gmpbZ2c5x",
		},
	});
	let info = await transporter.sendMail({
		from: '"Drashi Jain 👻" <kenyatta.witting@ethereal.email>',
		to: "drashijaindj121@gmail.com, baz@example.com", // list of receivers
		subject: "Hello ✔", // Subject line
		text: "Hello Drashi?", // plain text body
		html: "<b>Hello?</b>", // html body
	});

	console.log("Message sent: %s", info.messageId);

	res.json(info);
};
module.exports = sendMail;
