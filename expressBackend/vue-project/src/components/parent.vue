<template>
	<div>
		<app-students
			v-bind:students="students"
			v-on:editData="editData($event)"
			v-on:updateData="updateData($event)"
			v-on:deleteData="deleteData($event)"
		></app-students>
	</div>
</template>

<script>
import student from "./child.vue";

import axios from "axios";

export default {
	components: {
		"app-students": student,
	},
	data() {
		return {
			students: [
				{
					task_id: "",
					user_id: "",
					task: "",
				},
			],
		};
	},
	methods: {
		updateData: function (value) {
			let data = {
				task_id: value.task_id,
				user_id: value.user_id,
				task: value.task,
			};
			this.students.push(data);
		},
		editData: function (value) {
			for (let i = 0; i < this.students.length; i++) {
				if (this.students[i].task_id == value.id) {
					this.students[i].task = value.task;
				}
			}
		},
		deleteData: function (val1) {
			this.students = this.students.filter((item) => {
				return item.task_id != val1;
			});
		},
	},
	// on created session is checked
	created() {
		if (!this.$session.exists()) {
			window.location.replace("http://localhost:5173/#/");
		} else {
			console.log("listening bus");
			const id = localStorage.getItem("id");
			console.log(id);
			axios
				.get(`http://localhost:4010/details/${id}`)

				.then((response) => {
					console.log(response.data);

					this.students = response.data;

					console.log(this.students);
				})
				.catch((error) => {
					console.log(error);
				});
		}
	},
};
</script>
