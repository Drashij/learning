const Pool = require("pg").Pool;

const pool = new Pool({
	host: "localhost",
	user: "postgres",
	port: 5432,
	password: "Drashi@77",
	database: "postgres",
});

const createdata = (req, res) => {
	const params = req.body;
	const name = params.name1;
	const task = params.task1;

	pool.query(
		"INSERT INTO users ( name ,task) VALUES ($1, $2) RETURNING *",
		[name, task],
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
		res.json(
			// msg: "data shown successfully",
			result.rows
		);
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
	const id = parseInt(req.params.id);
	const para = req.body;
	const name = para.name2;
	const task = para.task2;
	const send = {
		id: parseInt(req.params.id),
		name: para.name2,
		task: para.task2,
	};

	pool.query(
		"UPDATE users SET name =$1, task =$2 where id =$3",
		// "UPDATE users SET  task =$1 where id =$2",
		[name, task, id],

		(err, result) => {
			if (err) {
				console.log(err);
				throw err;
			}
			res.json({
				msg: "updated successfully",
				data: send,
			});
		}
	);
};
const deletedata = (req, res) => {
	const id = parseInt(req.params.id);
	pool.query("Delete from users where id =$1", [id], (err, result) => {
		if (err) {
			//console.log("in connection");
			console.log(err);

			throw err;
		}
		res.json({
			data: "deleted successfully",
		});
	});
};
module.exports = { createdata, getData, getDataById, updatedata, deletedata };
//   "@vitejs/plugin-legacy": "^2.0.0",
//   "@vitejs/plugin-vue2": "^1.1.2",
//   "terser": "^5.14.2",
//   "vite": "^3.0.2"
//   "dev": "vite",
// 		"build": "vite build",
// 		"preview": "vite preview --port 4173"
