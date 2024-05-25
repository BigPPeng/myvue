<template>
    <div id="login-all">
        <div id="logo">现代农业服务平台</div>
    <div id="login">
        <el-card class="box-card">
            <div id="form">
                <el-input v-model="username" placeholder="请输入内容"></el-input>
                <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
                <el-button type="primary">登录</el-button>
            </div>
        </el-card>
    </div>
    <div id="clock">
        <div id="time">{{ time }}</div>
        <div id="data">{{ data }}</div>
    </div>
    </div>
</template>
<style scoped>/* scoped保证只在这个页面上style显示*/
#login-all{
    
    position: fixed;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-image: linear-gradient(
        90deg,
        cyan,
        purple
    );
    background-size: 400%;
    animation: myanimation 10s infinite;
}
@keyframes myanimation{
    0%{
        background-position: 0% 50%;
    }
    50%{
        background-position: 100% 50%;
     }
    100%{
        background-position: 0% 50%;
     }
}
#logo{
    color: aliceblue;
    font-size: 45px;
    font-weight: 800;
    text-transform: uppercase;
    position: absolute;
    top: 5%;
    left: 5%;
}
#login{
    position: absolute;
    top: 30%;
    left: 38%;
}
.el-card {
    width: 373px;
    height: 210px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 15px;
}
#form{
    line-height: 60px;
    padding-left: 15px;
    padding-right: 15px;
}
</style>
<script>
export default{
    data(){
        return{
            username:"",
            password:"",
            time:"",
            data:"",
        }
    }
}
</script>