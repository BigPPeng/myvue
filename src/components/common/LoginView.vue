<template>
  <div class="login_container">
    <!-- 登录模块 -->
    <div class="login_box">
      <div class="movie-title">
        <span>现代农业服务平台</span>
      </div>
      <!--表单-->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_form" label-width="0">
        <el-form-item prop="username">
          <el-input v-model="loginForm.userName" prefix-icon="el-icon-user" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.userPass" prefix-icon="el-icon-lock" type="password"
            placeholder="请输入密码"></el-input>
        </el-form-item>
        <!-- 新用户注册按钮 -->
        <!-- <el-button type="primary" @click="showRegisterDialog = true">新用户注册</el-button>
        -->
        <!-- <el-button type="text" @click="open">新用户注册</el-button>-->
        <el-button type="text" @click="dialogVisible = true">新用户注册</el-button>

        <el-form-item class="bts">
          <el-button type="primary" @click="login()">登录</el-button>
          <el-button type="info" @click="resetLoginForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 对话框 -->
    <el-dialog title="注册" :visible.sync="dialogVisible" width="50%" @close="dialogVisible = false">
      <el-form :model="registerForm" ref="registerForm" label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="registerForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="registerForm.userPass"></el-input>
        </el-form-item>
        <el-form-item label="身份">
          <el-radio-group v-model="registerForm.userType">
            <el-radio label="1">农户</el-radio>
            <el-radio label="4">供货商</el-radio>
            <el-radio label="5">收购商</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="registerForm.userPhone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="registerForm.userEmail"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="dialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "",
        userPass: "",
      },
      loginRules: {
        userName: [
          { required: true, message: "用户名是必填项", trigger: "blur" }, //必填项
          { min: 5, max: 12, message: "长度在 5 到 12个字符", trigger: "blur" }, //字符长度
        ],
        userPass: [
          { required: true, message: "用户密码是必填项", trigger: "blur" }, //必填项
          { min: 5, max: 12, message: "长度在 5 ~ 12个字符", trigger: "blur" }, //字符长度
        ],
      },
      // showRegisterView: false // 控制注册弹窗的显示与隐藏
      dialogVisible: false,
      registerForm: {
        userName: "",
        userPass: "",
        userType: "", // 初始值可以是'farmer'、'supplier'或'buyer'中的任何一个，或者为空字符串
        userPhone: "",
        userEmail: "",
      },
    };
  },

  methods: {
    //重置方法
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    //登录方法
    login() {
      //验证表单是否符合校验规则
      this.$refs.loginFormRef.validate(async (valid) => {
        //如果valid==true,表单符合校验规则,如果valid==false,表单不符合规则,退出方法
        if (!valid) return;
        //若表单符合规则,就去调用后台接口
        const { data: ref } = await this.$http.post(
          "/api/user/userLogin",
          this.loginForm
        );
        if (ref.status == 0) {
          this.$message.success("登录成功");
          window.sessionStorage.setItem("flag", "ok"); // session 放置
          //将user存储到session域空间中
          // console.log(ref);
          // console.log(ref.data);
          // console.log(ref.data.id);
          let userObject = JSON.stringify(ref.data);
          window.sessionStorage.setItem("user", [userObject]);
          //跳转到系统主页,通过路由实现
          this.$router.push({ path: '/IndexView1' });
        } else {
          this.$message.error("登录失败");
        }
      });
    },

    async submitForm() {
      console.log(this.registerForm);
      const { data: bb } = await this.$http.post("/api/user/userRegister", this.registerForm);
      console.log(bb);
      if(bb.status != 0) {
        this.$message.error("请重试，注册失败:"+bb.message);
      } else {
        this.$message.success("注册完成，请登录");
        this.dialogVisible = false;
      }
    },

    handleRegisterSuccess() {
        
      // 处理注册成功的逻辑，比如跳转到登录页面或首页
      //this.$router.push("/"); // 假设注册成功后跳转到登录页面
    },
  },
};
</script>

<style lang="less" scoped>
//根节点样式
.login_container {
  background-color: #2b4b6b;
  background-image: url(../../assets/26811716173483_.pic.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
  min-height: 100vh;
}

//登录盒子样式
.login_box {
  width: 450px;
  height: 250px;
  background-color: gainsboro;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0.9;

  .movie-title {
    font-size: 50px;
    margin-top: -60px;
    margin-left: 0px;
  }

  /*.avatar_box{*/
  /*   width: 130px;*/
  /*   height: 130px;*/
  /*   border: 1px solid #eee;*/
  /*   border-radius: 50%;*/
  /*   padding: 5px;*/
  /*   //盒子阴影*/
  /*   box-shadow: 0 0 2px #ddd;*/
  /*   position: absolute;*/
  /*   left: 50%;*/
  /*   transform: translate(-50%,-50%);*/
  /*   background-color: #0ee;*/
  /*   //LoGo样式*/
  /*   img{*/
  /*     width: 100%;*/
  /*     height: 100%;*/
  /*     background-color: #eee;*/
  /*     border-radius: 50%;*/
  /*   }*/
  /* }*/
}

//表单样式
.bts {
  display: flex;
  //弹性盒子元素将向行结束位置对齐
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 10px;

  /**
    border-box 告诉浏览器去理解你设置的边框和内边距的值是包含在width内的。
    也就是说，如果你将一个元素的width设为100px,
    那么这100px会包含其它的border和padding，内容区的实际宽度会是width减去border + padding的计算值。
    大多数情况下这使得我们更容易的去设定一个元素的宽高。
     */
  box-sizing: border-box;
}
</style>
