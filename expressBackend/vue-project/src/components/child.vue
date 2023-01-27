<template>
	<div>
		<div style="display: flex">
			<button @click="logout">log out</button>
		</div>
		<div id="students">
			<!-------------------------html code -------------->

			<h1 class="green">TODO LIST</h1>

			<div class="form__group">
				<input
					v-if="isadd"
					type="text"
					class="form__input"
					id="task"
					ref="input2"
					placeholder="New Task"
					required
				/>
				<br />
				<button
					v-if="isadd"
					type="submit"
					style="margin-left: 40%"
					@click="updateData(cur_id)"
				>
					Add
				</button>
			</div>
			<br />
			<button
				v-if="!isadd"
				type="submit"
				@click="isadd = !isadd"
				style="margin-left: 40%"
			>
				ADD New Task
			</button>

			<br />
			<br />
			<!------------------------------------table_code--------------->
			<table>
				<tr style="font-size: 25px">
					<th>Task</th>
					<th></th>
					<th></th>
				</tr>
				<tr>
					<th><hr /></th>
					<th><hr /></th>
					<th><hr /></th>
					<th><hr /></th>
				</tr>
				<tr v-if="students.length > 0" v-for="student in students">
					<input
						class="edit__input"
						id="student_task"
						v-if="isshow"
						:placeholder="[[student.task]]"
						v-model="text2"
					/>

					<td>{{ student.task }}</td>

					<td>
						<button v-on:click="dlt(student.task_id)">❌</button>
					</td>
					<!---------------------------edit button---------------- -->
					<td>
						<button @click="isshow = !isshow">edit✏️</button>
					</td>
					<!--------------------------after clicking edit button------->
					<td>
						<button
							v-if="isshow"
							type="submit"
							@click="edit(student.task_id), (isshow = false)"
						>
							✅
						</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>
<script>
import axios from "axios";

export default {
	props: {
		students: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			cur_id: localStorage.getItem("id"),
			isshow: false,
			text2: "",

			isadd: false,

			params: {
				task: "",
			},
			para: {
				task2: "",
			},
		};
	},
	methods: {
		logout: function () {
			localStorage.clear();
			this.$session.destroy();
			this.$router.push("/");
		},

		//..........................add().i.e.updatData().......post request code...........................//
		updateData: function (id) {
			this.isadd = !this.isadd;

			this.params.task = this.$refs.input2.value;

			axios
				.post(`http://localhost:4010/tasks/${id}`, this.params)
				.then((response) => {
					this.$emit("updateData", response.data.data);
					console.log(response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},

		//.............................delete().......delete request code.......................//

		dlt: function (val) {
			axios
				.delete(`http://localhost:4010/deleteTask/${val}`)
				.then((response) => {
					console.log(response);
				})
				.catch((error) => {
					console.log(error);
				});
			this.$emit("deleteData", val);
		},

		//.............................edit().......update/put request code....................//

		edit: function (val) {
			this.para.task2 = this.text2;
			axios
				.put(`http://localhost:4010/data/${val}`, this.para)
				.then((response) => {
					console.log(response.data.data);
					this.$emit("editData", response.data.data);
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>

<style scoped>
/* table styles */
table {
	font-family: arial, sans-serif;
	border-collapse: collapse;
	width: 150%;
	border: 3px solid hsla(160, 100%, 37%, 1);
	margin-left: auto;
	margin-right: auto;
	table-layout: fixed;
	width: 100%;
}

td,
th {
	text-align: left;
	padding: 8px;
}

/* other styles */

h1 {
	font-weight: 500;
	font-size: 2.6rem;
	top: -10px;
	text-align: center;
	margin-bottom: 10px;
}

h3 {
	font-size: 1.2rem;
}

/* <!-- temp.styles -- >  */

.form__input {
	font-family: "Roboto", sans-serif;
	color: #333;
	font-size: 0.8rem;
	margin: 0 auto;
	padding: 0.5rem 2rem;
	border-radius: 0.2rem;
	background-color: rgb(255, 255, 255);
	border: none;
	width: 60%;
	display: block;

	transition: all 0.3s;
}
.form__input:placeholder-shown + .form__label {
	opacity: 0;
	visibility: hidden;
	-webkit-transform: translateY(-4rem);
	transform: translateY(-4rem);
}
.edit__input {
	width: 50%;
	margin-top: 22px;
}
/* button styles */
button {
	background-color: hsla(160, 100%, 37%, 1);

	border: none;
	border-radius: 25px;
	padding: 12px 24px;
	text-align: center;
	font-size: 16px;
	margin: 4px 2px;
	opacity: 0.6;
	transition: 0.3s;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;
}

button:hover {
	opacity: 1;
}
</style>
