<template>
	<div>
		<app-students
			v-bind:students="students"
			v-on:updateData="updateData($event)"
			v-on:editData="editData($event)"
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
					id: "",
					name: "",
					task: "",
					isedit: false,
					edited: false,
				},
			],
		};
	},
	methods: {
		gett: function () {
			axios
				.get("http://localhost:4010/data")
				.then((response) => {
					this.students = response.data;
					console.log("response from parent");

					console.log(this.students);
				})
				.catch((error) => {
					console.log(error);
				});
		},
		updateData: function (value) {
			let data = {
				id: value.id,
				name: value.name,
				task: value.task,
				isedit: false,
				edited: false,
			};
			this.students.push(data);
		},
		editData: function (value) {
			for (let i = 0; i < this.students.length; i++) {
				if (this.students[i].id == value.id) {
					this.students[i].task = value.task;
				}
			}
		},
		deleteData: function (val1) {
			this.students = this.students.filter((item) => {
				return item.id != val1;
			});
		},
	},

	created() {
		this.gett();
	},
};
</script>
