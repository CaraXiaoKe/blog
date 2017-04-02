// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import './assets/common.scss'
import 'quill/dist/quill.snow.css'
import VueResource from 'vue-resource'
import router from './router'
import promise from 'es6-promise';
import Auth from '../middleware/auth'
import DpdTest from './test/index'
let auth = new Auth();
promise .polyfill();
Vue.use(VueResource);
Vue.use(ElementUI);
Vue.use(DpdTest);
router.beforeEach((to, from, next) => {
    if (!to.meta.noAuth&&!auth.loggedIn()) {
	    next({
	        path: '/login',
	        query: { redirect: to.fullPath }
	    })
    } else {
      	next()
    }
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
