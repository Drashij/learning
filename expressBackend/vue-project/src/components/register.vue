<template>
	<div>
		<h1>Register</h1>

		<div>
			<input
				type="text"
				v-model="name"
				id="name"
				name="name"
				placeholder="Name"
				required
			/>
		</div>
		<div>
			<input
				type="email"
				v-model="email"
				id="email"
				name="email"
				placeholder="Email"
				required
			/>
		</div>
		<div>
			<input
				type="password"
				v-model="password"
				id="password"
				name="password"
				placeholder="Password"
				required
			/>
		</div>

		<div>
			<button @click="updateData">Submit</button>
		</div>

		<a @click="log">Already registered? Login here</a>
	</div>
</template>

<script>
import axios from "axios";
export default {
	data() {
		return {
			name: "",
			email: "",
			password: "",
			arr: [
				{
					name: "",
					email: "",
					password: "",
				},
			],
		};
	},
	methods: {
		log: function () {
			this.$router.push("login");
		},
		updateData: function () {
			console.log("sending " + this.arr.email);
			axios
				.post("http://localhost:4010/users/register", {
					name: this.name,
					email: this.email,
					password: this.password,
				})
				.then((response) => {
					console.log(response.data);

					this.$router.push("login");
				})
				.catch((error) => {
					console.log(error);
				});
		},
	},
};
</script>
