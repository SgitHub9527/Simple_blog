<template>
<div class="container">
<div class="nav">
    <div @click="home">首页</div>
    <div> 
    <n-popselect v-model:value="value" :options="options" trigger="click">
        <div>分类 <span style="fontSize:10px">{{ categoryName }}</span></div>
    </n-popselect>
  </div>
    <div @click="backGround">后台</div>
</div>
<div class="article">
  <div v-for="(bolg,index) in blogListInfo" style="textAlign:center">
          <n-card :title="bolg.title" style="margin:15px auto">
              {{ bolg.content }}

              <template #header-extra>
                    <n-space>
                      <div>发布时间:{{ bolg.createTime }}</div>
                    </n-space>
              </template>
          </n-card>
        </div>
</div>
</div>
</template>

<script setup>
import { ref, onMounted, inject, reactive, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const axios = inject("axios");
const value = ref(0);
const options = ref([]);
const blogListInfo = ref([]);
const categoryName = computed(() => {
  let selectOptions = options.value.find(option => {
    return option.value == value.value;
  });
  return selectOptions ? selectOptions.label : "";
});
//组件挂载获取分类数据
onMounted(() => {
  loadCategory();
  loadArticle();
});
const loadCategory = async () => {
  let res = await axios.get("/category/list");
  options.value = res.data.result.map(item => {
    return {
      label: item.name,
      value: item.id
    };
  });
};
//点击首页跳转
const home = () => {
  router.push("/home");
};
//点击后台跳转至登录页
const backGround = () => {
  router.push("/login");
};
// 获取文章列表
const loadArticle = async () => {
  let res = await axios.get("/blog/list");
  let tem_res = res.data.result;
  for (let bolg of tem_res) {
    let timestamp = Number(bolg.createTime);
    if (timestamp === 0 || timestamp === null) {
      return "";
    } else {
      let date = new Date(timestamp);
      // 年
      let Y = date.getFullYear() + "年";
      // 月
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "月";
      // 日
      let D =
        date.getDate() < 10
          ? "0" + date.getDate() + "日"
          : date.getDate() + "日";
      // 时
      let H =
        date.getHours() < 10
          ? "0" + date.getHours() + "时"
          : date.getHours() + "时";
      let MM =
        date.getMinutes() < 10
          ? "0" + date.getMinutes() + "分"
          : date.getMinutes() + "分";
      //拼接成完整时间
      bolg.createTime = Y + M + D + H + MM;
    }
    blogListInfo.value = res.data.result;
  }
};
</script>

<style lang="scss" scoped>
body {
  padding: 0;
  margin: 0;
  position: relative;
}
.container {
  position: absolute;
  top: 10px;
  left: 250px;
  width: 800px;
  border: 1px solid #dbdbdb;
  text-align: center;
  margin: 0 5px;
}

.nav {
  display: flex;
  margin: 0 15px;
  font-size: 20px;
  color: #004;
  div {
    cursor: pointer;
    margin: 0 50px;
    &:hover {
      color: #008c8c;
    }
  }
}
</style>