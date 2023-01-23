<script setup>
import Parent from "./components/parent.vue";
</script>

<template>
	<div id="app">
		<Parent />
	</div>
</template>

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
