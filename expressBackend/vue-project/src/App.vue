<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>
<script setup>
import login from "./components/login.vue";
import Parent from "./components/parent.vue";
import register from "./components/register.vue";
</script>
<style scoped>
header {
	line-height: 1.5;
}

@media (min-width: 1024px) {
	header {
		margin-left: 10%;
	}
}
</style>
