<template>
  <div class="menu">
    <div class="menu-item">
      <div v-for="(option,index) in menuOptions" @click=toPage(option) >{{option.name}}</div>
    </div>
    <div style="padding:20px;width:100%">
      <router-view></router-view>
    </div>
  <!-- 水印 -->
  <n-watermark
  v-if="show"
  content="寒冬将至！多备衣物！！！"
  cross
  fullscreen
  :font-size="16"
  :line-height="16"
  :width="384"
  :height="384"
  :x-offset="12"
  :y-offset="60"
  :rotate="-15"
/>
<n-switch v-model:value="show"  style="position:absolute"/>
  </div>
</template>

<script>
// inject
import { h, ref } from "vue";
// import { AdminStore } from "../../stores/AdminStore";
import { useRoute, useRouter } from "vue-router";
//#region 
// const adminStore = AdminStore();
// const axios = inject("axios");
// const message = inject("message");
//引入图标
// import { NIcon } from "naive-ui";
// import {
//   AccessibilitySharp,
//   CalendarClearSharp,
//   LogOut
// } from "@vicons/ionicons5";
//#endregion
export default {
  setup() {
    //水印
    const show = ref(false);
    //实例化路由
    const route = useRoute();
    const router = useRouter();
    //配置
    const menuOptions = [
      {
        name: "文章管理",
        key: "article-management",
        href: "/dashboard/article"
      },
      {
        name: "分类管理",
        key: "category-management",
        href: "/dashboard/classify"
      },
      {
        name: "退出",
        key: "log-out",
        href: "/logout"
      }
    ];
    //设置icon
    // const renderMenuIcon = option => {
    //   if (option.key === "article-management") {
    //     return h(NIcon, null, { default: () => h(AccessibilitySharp) });
    //   }
    //   if (option.key === "category-management") {
    //     return h(NIcon, null, { default: () => h(CalendarClearSharp) });
    //   }
    //   if (option.key === "log-out") {
    //     return h(NIcon, null, { default: () => h(LogOut) });
    //   }
    // };
    const toPage=(option)=>{
      if(option.href=='/logout'){
        router.push('/login')
      }else{
        router.push(option.href)
      }
    }
    return {
      menuOptions,
      show,
      // renderMenuIcon,
      toPage
    };
  }
};
</script>

 <style lang="scss"  scoped>
.body {
  margin: 0;
  padding: 0;
  position: relative;
}
.menu {
  display: flex;
  position: absolute;
 
  top: 0;
  left: 10px;
  color:#008c8c;
  margin:0 auto;
  padding:5px;
  max-width: 100%
}
.menu-item{
padding: 20px 0;
box-sizing: border-box;
line-height:55px;
text-align: center;
width: 200px;
height:95vh;
border-right:1px solid #dadada;
div{
  cursor: pointer;
  &:hover{
    color: #fd760e
  }
}
}
</style> 
