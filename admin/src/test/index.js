import A from './dpdtest'
import B from './b'
let install = function(Vue){
	if (install.installed) return;
	Vue.component(A.name,A);
	Vue.component(B.name,B);
}
// if (typeof window !== 'undefined' && window.Vue) {
//   install(window.Vue);
// };
export default {
	install,
	A,
	B
};