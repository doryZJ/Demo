import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

import Main from '../views/main'
import Home from '../views/home'
import Index from '../views/index'
import UploadPic from '../views/uploadpic'
import Language from '../views/language'
import Login from '../views/login'
import store from '../store/store'

const router = new VueRouter({
	mode: 'history',
	routes:[
		{
			path: '/',
			name:'home',
			meta: {
				requireAuth: true,
			},
			component:Home,
			children: [
				{
					path: '/login',
					name:'login',
					component: {
						login: Login
					} 
				}
			]
		},
		{
			path: '/uploadpic',
			name:'uploadpic',
			component:UploadPic
		},
		{
			path: '/language',
			name:'language',
			component:Language
		}
	]
})
// router.beforeEach((to, from, next) => {
// 	if (to.meta.requireAuth) {
// 		if (store.state.token) {
// 			next()
// 		} else {
// 			next({
// 				path: '/login',
// 				query: {redirect: to.fullPath}
// 			})
// 		}
// 	}
// 	else {
// 		next()
// 	}
// })
export default router