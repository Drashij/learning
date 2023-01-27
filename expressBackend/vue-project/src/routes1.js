import parent from "./components/parent.vue";
import login from "./components/login.vue";
import register from "./components/register.vue";
import index from "./components/index.vue";
export default [
	{ path: "/", component: index },
	{ path: "/register", component: register },
	{ path: "/dashboard", component: parent },
	{ path: "/login", component: login },
];
