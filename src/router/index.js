import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Logout from "../views/Logout.vue";
import Profile from "../views/Profile.vue";
import PlanningPoker from "../views/PlanningPoker.vue";
import Retro from "../views/Retro.vue";
import Room from "../views/Room.vue";

import store from "../store/index.js";

const routes = [

	{
		path: "/",
		redirect: "/home",
	},

	{
		path: "/home",
		name: "home",
		component: Home,
		meta: {
			guest: true,
		},
  	},

	{
		path: "/about",
		name: "about",
		component: About
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		// component: () =>
		//   import(/* webpackChunkName: "about" */ "../views/About.vue")
	},

	{
		path: "/login",
		name: "login",
		component: Login,
		meta: {
			guest: true,
			login: true,
		},
	},

	{
		path: "/logout",
		name: "logout",
		component: Logout,
		meta: {
			requiresAuth: true,
		},
	},

	{
		path: "/register",
		name: "register",
		component: Register,
		meta: {
			guest: true,
		},
	},

	{
		path: "/profile",
		name: "profile",
		component: Profile,
		meta: {
			requiresAuth: true,
		},
	},

	{
		path: "/planningpoker",
		name: "planningpoker",
		component: PlanningPoker,
		meta: {
			guest: true,
			requiresAuth: false,
		},
		},

    {
        path: "/retrospective",
        name: "retrospective",
        component: Retro,
        meta: {
			guest: true,
            requiresAuth: false,
        },
    },

	{ 	
		path: '/planningpoker/:roomId', 
		component: Room
	}
	// {
	//   path: "/admin",
	//   name: "admin",
	//   meta: {
	//       requiresAuth: true,
	//       isAdmin: true,
	//   },
	// },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Handle ruquests to the routes based on the meta specification

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!store.getters.getIsLoggedIn) {
          next({ name: "login" });
      } else {
          next();
          // if (to.matched.some((record) => record.meta.is_admin)) {
          //     if (store.getters.user.is_admin == 1) {
          //         next();
          //     } else {
          //         next();
          //     }
          // } else {
          //     next();
          // }
      }
  } else if (to.matched.some((record) => record.meta.guest)) {
      if (to.path == "/login") {
          if (store.getters.getIsLoggedIn) {
            next({ name: "home" });
          } else {
            next();
          }
      } else {
          if (!store.getters.getIsLoggedIn) {
            next();
          } else {
            next();
          }
      }
  } else {
    next();
  }
});


export default router;
