<template>
    <div id="app">
        <template v-if="withoutlayout">
            <router-view></router-view>
        </template>
        <template v-if="!withoutlayout">
            <header class="g-header f-bg-blue">
                <div class="m-topbar wrap">
                    <el-row class="top-bar">
                        <el-col :xs="6" :sm="4" :lg="2">
                            <div class="icon-wrap" @click="handleClick">
                                <i class="el-icon-menu"></i>
                            </div>
                        </el-col>
                        <el-col :xs="18" :sm="20" :lg="22">
                            <section class="admin-title">
                                博客后台管理系统
                            </section>
                            <section class="admin-box">
                                <span>{{username}}</span> <span @click="loginOut">退出</span>
                            </section>
                        </el-col>
                    </el-row>
                </div>
            </header>
            <main>
                <el-row>
                    <el-col :xs="6" :sm="4" :lg="2" v-show="isShowNav">
                        <div style="height:1px;visiblity:hidden;"></div>
                        <aside class="g-nav f-bg-blue">
                            <nav class="m-nav fixed">
                                <ul class="nav">
                                    <router-link to="/" tag="li">文章列表</router-link>
                                    <router-link to="/add" tag="li">+添加文章</router-link>
                                    <router-link v-if="canCreateUser" to="/newuser" tag="li">添加用户</router-link>
                                </ul>
                            </nav>
                        </aside>
                    </el-col>
                    <el-col :xs="18" :sm="20" :lg="22" :class="{'f-w100':!isShowNav}">
                        <div class="g-content">
                            <router-view></router-view>
                        </div>
                    </el-col>
                </el-row>
            </main>
        </template>
    </div>
</template>

<script>
export default {
    name: 'app',
    watch:{
        $route(to,from){
            this.withoutlayout = to.meta.withoutlayout;
            this.username = store.get('user');
            this.canCreateUser = this.username==="杜培东";
        }
    },
    data(){
        return {
            isShowNav: true,
            withoutlayout:this.$route.meta.withoutlayout,
            username:"",
            canCreateUser:false
        }
    },
    mounted(){
        this.username = store.get('user');
    },
    methods:{
        handleClick(){
            this.isShowNav = !this.isShowNav;
        },
        loginOut(){
            store.set('token','');
            store.set('user','');
            this.$router.push('/login');
        }
    }
}
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    .g-header {
        position:fixed;
        z-index:100;
        top:0;
        width:100%;
        padding-right:20px;
    }
     .g-nav {
        position:fixed;
        top:50px;
        left:0;
        height:100%;
        border-top:1px solid rgba(255,255,255,0.3);
        margin-left:-2px;
        text-align:center;
    }
    .g-content {
        padding:20px;
        padding-top:70px;
    }
    .m-topbar .top-bar {
        height:50px;
        line-height: 50px;
        background:#27b3e7;
    }
    .m-topbar .icon-wrap {
        text-align:center;
        height:100%;
    }
    .m-topbar .top-bar .el-col:first-child {
        border-right:1px solid rgba(255,255,255,0.3);
    }
    .m-nav .nav {
        padding-top:10px;
        line-height:36px;
    }
    .m-nav .nav:hover {
        cursor:pointer;
    }
    .m-topbar .admin-box {
        float:right;
    }
    .m-topbar .admin-title {
        float:left;
        margin-left:20px;
    }
    @media (min-width: 768px){
        .g-nav {
            width: 16.66667%;
        }

    }

    @media (min-width: 1200px){
        .g-nav {
            width: 8.33333%;
        }
    }

    @media (max-width: 768px){
        .g-nav {
            width: 25%;
        }
    }
</style>
