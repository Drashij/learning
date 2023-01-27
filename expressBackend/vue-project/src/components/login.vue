<template>
	<div>
		<p v-if="ierr" style="color: yellow">Wrong id or password</p>
		<h1>Login</h1>

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
			<button @click="login">Login</button>
		</div>

		<a @click="log">Register</a>
		<a @click="home" style="margin-left: 20px">Home</a>
	</div>
</template>
<script>
import axios from "axios";
import { EventBus } from "../main";
export default {
	data() {
		return {
			ierr: false,
			email: "",
			password: "",
			arr: [],
			dataa: "",
		};
	},
	methods: {
		log: function () {
			this.$router.push("register");
		},
		home: function () {
			this.$router.push("/");
		},
		login: function () {
			console.log("this is sending email" + this.email);
			console.log("this is sending password" + this.password);

			axios
				.post("http://localhost:4010/users/login", {
					email: this.email,
					password: this.password,
				})

				.then((response) => {
					console.log(response.data.data[0].id);

					this.$session.start();
					this.$session.set("jwt", response.data.token);
					localStorage.setItem("id", response.data.data[0].id);
					console.log("emmiting bus");

					this.$router.push("/dashboard");
				})
				.catch((error) => {
					this.ierr = true;
					console.log("wrong id or password");
					console.log(error);
				});
			// axios
			// 	.get("http://localhost:4010/login", {
			// 		email: this.email,
			// 		password: this.password,
			// 	})
			// 	.then((response) => {
			// 		this.students = response.data;
			// 		// console.log("response from parent");

			// 		console.log(this.students);
			// 	})
			// 	.catch((error) => {
			// 		console.log(error);
			// 	});
			// window.location.replace("http://localhost:5173/#/dashboard");
		},
	},
};
</script>
