<template>
	<div class="center">
		<h1>Welcome to To-do application</h1>
		<p>Please login or register to continue...</p>
		<br />
		<button @click="log">Login</button>
		<button @click="reg">Register</button>
	</div>
</template>
<script>
export default {
	data() {
		return {};
	},
	methods: {
		log: function () {
			this.$router.push("login");
		},
		reg: function () {
			this.$router.push("register");
		},
	},
};
</script>
<style scoped>
button {
	background-color: hsla(160, 100%, 37%, 1);

	border: none;
	border-radius: 25px;
	padding: 12px 24px;
	text-align: center;
	font-size: 16px;
	margin: 4px 14px;
	opacity: 0.6;
	transition: 0.3s;
	display: inline-block;
	text-decoration: none;
	cursor: pointer;
}

button:hover {
	opacity: 1;
}
.center {
	text-align: center;
}
</style>
