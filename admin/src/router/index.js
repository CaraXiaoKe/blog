import Vue from 'vue'
import Router from 'vue-router'
import Index from 'components/index'
import Add from 'components/add'
import Edit from 'components/edit'
import Login from 'components/login'
import Admin from 'components/admin'
import Plugins from 'components/plugin'
import PluginsList from 'components/plugin-list'
import PluginEdit from 'components/plugin-edit'
Vue.use(Router)

export default new Router({
  	routes: [
	    {
	      	path: '/',
	      	name: 'index',
	      	component: Index
	    },
	    {
	      	path: '/add',
	      	name: 'add',
	      	component: Add
	    },
	    {
	      	path: '/edit/:id',
	      	name: 'edit',
	      	component: Edit
	    },
	    {
	      	path: '/newuser',
	      	name: 'newuser',
	      	component: Admin
	    },
	    {
	      	path: '/plugin/list',
	      	name: 'plugin_list',
	      	component: PluginsList
	    },
	    {
	      	path: '/plugin/add',
	      	name: 'plugin',
	      	component: Plugins
	    },
	    {
	      	path: '/plugin/edit/:id',
	      	name: 'plugin_edit',
	      	component: PluginEdit
	    },
	    {
	      	path: '/login',
	      	name: 'login',
	      	component: Login,
	      	meta:{
	      		withoutlayout:true,
	      		noAuth:true
	      	}
	    }
	]
})
