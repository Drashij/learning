const Pool = require("pg").Pool;

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "Drashi@77",
	database: "postgres",
});

const createdata = (req, res) => {
	const user_id = parseInt(req.params.id);
	const params = req.body;

	const task = params.task;

	pool.query(
		"INSERT INTO tasks (  task,user_id) VALUES ($1, $2) RETURNING *",
		[task, user_id],
		(err, result) => {
			if (err) {
				console.log(err);
				throw err;
			}
			res.status(200).json({
				msg: "data created successfully",
				// data: req.body,
				data: result.rows[0],
			});
		}
	);
};
const getData = (req, res) => {
	pool.query("select * from users", (err, result) => {
		if (err) {
			console.log(err);
			throw err;
		}
		res.json({
			msg: "data shown successfully",
			data: result.rows,
		});
	});
};
const getDataById = (req, res) => {
	let id = parseInt(req.params.id);
	pool.query("select * from users where id =$1", [id], (err, result) => {
		if (err) {
			console.log(err);
			throw err;
		}
		res.json({
			data: result.rows,
		});
	});
};
const updatedata = (req, res) => {
	const task_id = parseInt(req.params.id);
	const task = req.body.task2;
	// console.log(req.body);
	// const task = para.text2;
	// console.log(task);
	// const task = para.task2;
	const send = {
		id: parseInt(req.params.id),
		task: task,
	};

	pool.query(
		`UPDATE tasks SET  task =$1 where task_id =$2`,
		// "UPDATE users SET  task =$1 where id =$2",
		[task, task_id],

		(err, result) => {
			if (err) {
				console.log(err);
				throw err;
			}
			res.json({
				data: send,
			});
		}
	);
};
const deletedata = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query("Delete from tasks where task_id =$1", [id], (err, result) => {
		if (err) {
			console.log(err);

			throw err;
		}
		res.json({
			data: "deleted successfully",
		});
	});
};
// creating login register etc
// const addTask = (req, res) => {
// const parat = req.body;
// const user_id = parat.user_id;
// const task = parat.task;
// console.log("user_id " + user_id + "task " + task);

// pool.query(
// 	"INSERT INTO tasks ( user_id ,task) VALUES ($1, $2) RETURNING *",
// 	[user_id, task],
// 	(err, result) => {
// 		if (err) {
// 			console.log(err);
// 			throw err;
// 		}
// 		res.status(200).json({
// 			msg: "data created successfully",
// 			// data: req.body,
// 			data: result.rows[0],
// 		});
// 	}
// );
const tempPost = (req, res) => {
	const paramt = req.body;
	console.log("got this in as req" + req.getData);
	const name = paramt.name;
	const email = paramt.email;
	const password = paramt.password;
	pool.query(
		`SELECT * FROM users
		        WHERE email = $1`,
		[email],
		(err, results) => {
			if (err) {
				console.log(err);
			}
			console.log(results.rows);

			if (results.rows.length > 0) {
				return res.render("register", {
					message: "Email already registered",
				});
			} else {
				pool.query(
					`INSERT INTO users (name, email, password)
		                VALUES ($1, $2, $3)
		                RETURNING id, password`,
					[name, email, password],
					(err, results) => {
						if (err) {
							throw err;
						}
						res.status(200).json({
							msg: "data created successfully",
							// data: req.body,
							data: results.rows[0],
						});
						console.log(results.rows);
						// req.flash("success_msg", "You are now registered. Please log in");
						// res.redirect("/users/login");
					}
				);
			}
		}
	);
};
const getDetailsById = async (req, res) => {
	let user_id = parseInt(req.params.id);
	var data = await pool.query("select * from tasks where user_id =$1", [
		user_id,
	]);
	res.json(data.rows);
};

const getlogin = (req, res) => {
	const arr = req.body;
	const email = arr.email;
	const password = arr.password;

	pool.query(
		`select id from users where email=$1 and password=$2`,
		[email, password],
		(err, result) => {
			if (err) {
				{
					console.log(err);

					throw err;
				}
			}

			res.json({
				token:
					"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
				data: result.rows,
			});
		}
	);
};
const gettask = (req, res) => {
	let user_id = parseInt(req.params.id);
	pool.query(
		"select * from tasks where user_id =$1",
		[user_id],
		(err, result) => {
			// pool.query("select * from tasks", (err, result) => {
			if (err) {
				console.log(err);
				throw err;
			}
			res.json(
				// message: "data shown successfully",
				result.rows
			);
		}
	);
};

module.exports = {
	createdata,
	getData,
	getDataById,
	updatedata,
	deletedata,
	gettask,
	getlogin,
	tempPost,
	getDetailsById,
};
