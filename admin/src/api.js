import Vue from 'vue'
export default {
	page_size:10,//分页配置,

	getArticleTypes(){//获取文章分类列表
		return new Promise((reslove, reject)=> {
			Vue.http.get('/api/article/types/all').then((res)=>{
				reslove(res.data);
			})
		})
	},
	getArticles(query){
		return new Promise((reslove, reject)=>{
			let params = query||{};
			Vue.http.get('/api/article',{params}).then((res)=>{
				reslove(res.data);
			})
		})
	},
	getPageArticles(query){
		return new Promise((reslove, reject)=>{
			let params = {
				conditons : query.conditions,
                sortedBy  : query.sortedBy,
                limit     : this.page_size,
                offset    : query.offset,
                filterBy  : query.filterBy
			};
			Vue.http.get('/api/article/pagination/fetch', {params}).then((res)=>{
				reslove(res.data);
			})
		})
	}
}