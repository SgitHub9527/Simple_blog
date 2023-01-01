<template>
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
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
const message = inject("message");
const dialog = inject("dialog");
const axios = inject("axios");
const blogListInfo = ref([]);
onMounted(() => {
  loadArticle();
});
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
</style>