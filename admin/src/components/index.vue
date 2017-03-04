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
                prop="post_user"
                label="作者"
                >
            </el-table-column>
            <el-table-column
                label="发表日期"
                :formatter="formatterDate"
                >
            </el-table-column>
            <el-table-column
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
        <el-pagination
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pageSize"
              layout="total, prev, pager, next"
              :total="total">
        </el-pagination>
    </div>
</template>

<script>
import api from '../api.js'

export default {
    name: 'index',
    data () {
        
        return {
            tableHash: {},
            tableData:[],
            currentPage:1,
            pageSize:api.page_size,
            total:0,
            conditons:{

            },
            sortedBy:{
                _id:-1
            },
            filterBy  : 'post_title post_created post_classify_sub post_classify_sup post_user'
        }
    },
    mounted () {
        let params = {
                conditons : this.conditions,
                sortedBy  : this.sortedBy,
                limit     : this.pageSize,
                offset    : this.currentPage-1,
                filterBy  : this.filterBy
        };
        Promise.all([api.getArticleTypes(),api.getPageArticles(params)]).then(([typesRes,artilceRes])=>{
            let arr = {};
            typesRes.info.forEach((item)=>{
                arr[item.field_id] = item.field_name;
                item.field_members.forEach((_item)=>{
                    arr[_item.field_member_id] = _item.field_member_name;
                });
            });
            this.tableHash = Object.freeze(arr);
            if(artilceRes.status == 1){
                this.tableData = artilceRes.info.collections;
                this.total = artilceRes.info.count;
            }else{
                this.$message({
                    message: '获取列表失败',
                    type: 'warning',
                    duration:1500
                });
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
            return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        },
        handleCurrentChange(currentPage){
            let params = {
                conditons : this.conditions,
                sortedBy  : this.sortedBy,
                limit     : this.pageSize,
                offset    : currentPage-1,
                filterBy  : this.filterBy
            };

            api.getPageArticles(params).then((res)=>{
                this.tableData = res.info.collections;
            })
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .el-pagination {
        text-align: center;
        margin-top:20px;
    }
</style>
