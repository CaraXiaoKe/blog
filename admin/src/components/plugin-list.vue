<template>
    <div>
        <h1 class="m-title">
            插件列表
        </h1>
        
        <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
                prop="post_title"
                label="插件题目"
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
                label="标签"

                :formatter="formatterTag"
                >
            </el-table-column>
            <el-table-column
                label="操作"
                width="100"
                fixed="right">
                <template scope="scope">
                    <router-link :to="'/plugin/edit/'+scope.row._id">
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
            filterBy  : 'post_title post_created post_tag post_user'
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
        api.getPagePlugins(params).then((res)=>{
            if(res.status == 1){
                this.total = res.info.count;
                this.tableData = res.info.collections;
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
        formatterTag(row){
            return row.post_tag.join(",");
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
