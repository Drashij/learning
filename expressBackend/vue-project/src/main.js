import Vue from "vue";
import App from "./App.vue";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import Routes from "./routes1";
import VueSession from "vue-session";

import "./assets/main.css";
Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueSession);
const router = new VueRouter({
	routes: Routes,
});

export const EventBus = new Vue();
new Vue({
	render: (h) => h(App),
	router: router,
}).$mount("#app");
