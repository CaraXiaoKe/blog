import A from './a.vue'
A.install = function(Vue){
	if (A.installed) return;
	Vue.component(A.name,A);
};
export default A;