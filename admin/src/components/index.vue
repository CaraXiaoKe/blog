<template>
    <div>
        <h1 class="m-title">
            文章列表
        </h1>
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="post_title"
                label="文章题目"
                >
            </el-table-column>
            <el-table-column
                prop="post_date"
                label="发表日期"
                :formatter="formatterDate"
                >
            </el-table-column>
            <el-table-column
                prop="post_classify"
                label="分类"

                :formatter="formatterClass"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="100"
                fixed="right">
                <template scope="scope">
                    <router-link :to="'/edit/'+scope.row._id">
                        <el-button type="primary" icon="edit" size="small"></el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {classify_data} from '../api.js'
export default {
    name: 'index',
    data () {
        let arr = {};
        classify_data.forEach((item)=>{
            arr[item.field_id] = item.field_name;
            item.field_members.forEach((_item)=>{
                arr[_item.field_member_id] = _item.field_member_name;
            });
        });
        return {
            tableHash: Object.freeze(arr),
            tableData:[]
        }
    },
    mounted () {
        this.$http.get('/api/article').then((res)=>{
            if(res.data.status == 1){
                this.tableData = res.data.info;
            }else{
                alert("获取列表失败");
            };
        })
    },
    methods: {
        handleClick(){
            
        },
        formatterClass(row){
            return this.tableHash[row.post_classify_sup]+"-"+this.tableHash[row.post_classify_sub];
        },
        formatterDate(row){
            let date = new Date(row.post_created);
            return date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate();
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
