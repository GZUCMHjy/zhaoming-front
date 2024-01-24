<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
    >
      <el-menu-item index="/Home">轮播图修改</el-menu-item>
      <el-menu-item index="/class">类名修改</el-menu-item>
      <el-menu-item index="/variety">修改品名</el-menu-item>
      <el-menu-item index="/show">修改展品</el-menu-item>
      <el-menu-item index="/search">搜索展品</el-menu-item>
      <div class="rightbox">
        <a
          href="javascript:void(0);"
          type="primary"
          class="xiugai"
          @click="centerDialogVisible = true"
        >修改密码</a>
        <a href="/" @click="outlogin" class="dengchu" style="color: white">登出</a>
      </div>
    </el-menu>

    <el-dialog title="密码修改" :visible.sync="centerDialogVisible" width="30%" center>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名" prop="user">
          <el-input type="password" v-model="ruleForm.user" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="旧密码" prop="oldpass">
          <el-input type="password" v-model="ruleForm.oldpass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="修改密码" prop="newpass">
          <el-input type="password" v-model="ruleForm.newpass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="centerDialogVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { changeUser, logout } from "@/api/users";
import { removeToken, getItem } from "@/utils/storage";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入旧密码"));
      } else {
        callback();
      }
    };
    var validatePass4 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    return {
      activeIndex: "/Home",
      centerDialogVisible: false,
      formLabelAlign: {},
      ruleForm: {
        user: "",
        oldpass: "",
        newpass: "",
        checkPass: "",
      },
      rules: {
        user: [{ validator: validatePass4, trigger: "blur" }],
        oldpass: [{ validator: validatePass3, trigger: "blur" }],
        newpass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let users = this.ruleForm;
          changeUser({
            managerName: users.user,
            newPassword: users.newpass,
            oldPassword: users.oldpass,
          })
            .then((res) => {
              if (res === "managerNotExist") {
                this.$message.error("用户不存在");
              } else if (res === "passwordError") {
                this.$message.error("密码错误");
                this.ruleForm.oldpass = "";
                this.ruleForm.newpass = "";
                this.ruleForm.checkPass = "";
              } else {
                this.$message.success("修改成功!");
                this.centerDialogVisible = false;
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    outlogin() {
      let nowtoken = getItem('token');
      logout(nowtoken).then(res => {
        console.log(res);
        removeToken("token");
      })
    },
  },
};
</script>
<style>
.xiugai {
  float: right;
  margin: 20px 10px 0 0;
  color: white;
}
.dengchu {
  float: right;
  margin: 20px 20px 0 0;
}
</style>