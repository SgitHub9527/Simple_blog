<template>
  <n-card title="后台管理系统" style="width:300px">
    <!-- 绑定数据、定义校验规则 -->
    <n-form ref="formRef" :model="admin" :rules="rules">
      <!-- 账号 -->
  <n-form-item path="account" label="账号">
    <n-input v-model:value="admin.account" @keydown.enter.prevent />
  </n-form-item>
     <!-- 密码 -->
     <n-form-item path="password" label="密码">
    <n-input v-model:value="admin.password"  type ="password" @keydown.enter.prevent />
  </n-form-item>
      <!-- 复选框  -->
      <n-checkbox v-model:checked="admin.rember" style="margin-right:10px" label="记住我"></n-checkbox>
      <!-- 提交按钮 -->
      <n-button  @click="submitAdmin">登录</n-button>
</n-form>
  </n-card>
</template>

<script>
import { reactive, inject, ref } from "vue";
// 引入校验规则
import { isvalidAccount, isvalidPassword } from "../common/formValidator";
//引入管理员stores
import { AdminStore } from "../stores/AdminStore";
//引入跳转路由
import { useRoute, useRouter } from "vue-router";

//inject注入依赖
// formRef响应式默认为空
export default {
  setup() {
    const formRef = ref(null);
    const adminStore = AdminStore();
    const message = inject("message");
    //实例化路由对象
    const route = useRoute();
    const router = useRouter();
    // 响应式布局reactive
    const admin = reactive({
      account: localStorage.getItem("account") || "", //账号
      password: localStorage.getItem("password") || "", //密码
      rember: localStorage.getItem("rember") == 1 || false //复选框
    });
    //注入axios依赖
    const axios = inject("axios");
    const submitAdmin = async () => {
      //axios请求发送
      let result = await axios.post("/admin/login", {
        adminName: admin.account,
        password: admin.password
      });

      if (result.data.code == 200) {
        adminStore.id = result.data.data.id;
        adminStore.account = result.data.data.adminName;
        adminStore.password = result.data.data.password;
        adminStore.token = result.data.data.token;

        if (admin.rember) {
          localStorage.setItem("account", admin.account);
          localStorage.setItem("password", admin.password);
          localStorage.setItem("rember", admin.rember ? 1 : 0);
        }
        message.info("登录成功");
        router.push({
          //登录成功跳转至分类页
          path: "/dashboard/article"
        });
      } else {
        message.error("登录失败");
      }
    };
    //表单校验规则
    let rules = {
      //账号
      account: [
        {
          required: true,
          // message: "请输入账号",
          //自定义账号 要求 数字、字母、下划线的组合，
          validator: isvalidAccount,
          trigger: ["input", "blur"]
        }
      ],
      //密码
      password: [
        {
          required: true,
          validator: isvalidPassword,
          trigger: ["input", "blur"]
        }
      ]
    };

    return {
      formRef,
      admin,
      rules,
      submitAdmin
    };
  }
};
</script>

<style lang="scss" scoped>
</style>