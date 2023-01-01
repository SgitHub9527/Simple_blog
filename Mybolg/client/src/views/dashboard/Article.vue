<template>
    <div>
    <n-tabs type="line" justify-content="start" v-model:value="bolgInfo"> 
      <!-- 文章列表 -->
      <n-tab-pane name="list" tab="文章列表">
        <div v-for="(bolg,index) in blogListInfo" style="textAlign:center">
          <n-card :title="bolg.title" style="margin:15px auto">
              {{ bolg.content }}
              <template #header-extra>
                    <n-space>
                      <div>发布时间:{{ bolg.createTime }}</div>
                      <n-button @click="updateBolgInfo(bolg)">修改</n-button>
                      <n-button @click="deleteBolgInfo(bolg)">删除</n-button>
                    </n-space>
              </template>
          </n-card>
        </div>
      </n-tab-pane>
      <!-- 添加博客 -->
      <n-tab-pane name="add" tab="添加文章">
        <n-form>   
          <!-- 文章标题 -->
          <n-form-item label="标题">
            <n-input v-model:value="addArticle.title" placeholder="请输入标题"></n-input>
          </n-form-item> 
          <n-form-item label="分类">
            <n-select v-model:value="addArticle.categoryId" :options="categoryOptions" placeholder="请选择分类" style="textAlign:center"/>
          </n-form-item> 
          <!-- 文章内容 -->
          <n-form-item label="内容">
            <RichTextEditor v-model="addArticle.content"></RichTextEditor>
          </n-form-item>  
          <n-button @click="add">提交</n-button>  
        </n-form>
      </n-tab-pane>
      <!-- 修改博客 -->
      <n-tab-pane name="update" tab="修改">
        <n-form>   
           <!-- 文章标题 -->
           <n-form-item label="标题">
            <n-input v-model:value="updateArticle.title" placeholder="请输入标题"></n-input>
          </n-form-item> 
          <n-form-item label="分类">
            <n-select v-model:value="updateArticle.categoryId" :options="categoryOptions" placeholder="请选择分类" style="textAlign:center"/>
          </n-form-item> 
          <!-- 文章内容 -->
          <n-form-item label="内容">
            <RichTextEditor v-model="updateArticle.content"></RichTextEditor>
          </n-form-item>  
          <n-button @click="update">提交</n-button>  
        </n-form>
      </n-tab-pane>
    </n-tabs>
    </div>
</template>

<script setup>
import { AdminStore } from "../../stores/AdminStore";
import { ref, reactive, inject, onMounted, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import RichTextEditor from "../../components/RichTextEditor.vue";
const route = useRoute();
const router = useRouter();
const message = inject("message");
const dialog = inject("dialog");
const axios = inject("axios");
const bolgInfo = ref("list");
const addArticle = reactive({
  categoryId: null,
  title: "",
  content: ""
});
//存储文章
const categoryOptions = ref([]);
//存储博客
const blogListInfo = ref([]);
onMounted(() => {
  loadCategory();
  loadArticle();
});
//修改博客数据
const updateArticle = reactive({
  id: null,
  title: null,
  categoryId: null,
  content: null
});
//获取分类列表
const loadCategory = async () => {
  let res = await axios.get("/category/list");
  categoryOptions.value = res.data.result.map(item => {
    return {
      label: item.name,
      value: item.id
    };
  });
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
//添加博客
const add = async () => {
  let res = await axios.post("/blog/_token/add", addArticle);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    loadArticle();
    bolgInfo.value = "list";
  } else {
    message.error(res.data.msg);
  }

  (addArticle.categoryId = null),
    (addArticle.title = ""),
    (addArticle.content = "");
};
//添加博客10ms后发起一次请求博客数据请求
watch(
  addArticle,
  (newValue, oldValue) => {
    loadArticle();
  },
  { immediate: true }
);
//点击修改 携带参数跳转至修改页
const updateBolgInfo = async bolg => {
  bolgInfo.value = "update";
  updateArticle.id = bolg.id;
  updateArticle.title = bolg.title;
  updateArticle.categoryId = bolg.categoryId;
  updateArticle.content = bolg.content;
};
//修改后的提交按钮
const update = async () => {
  let res = await axios.put("/blog/_token/update", updateArticle);
  if (res.data.code == 200) {
    message.info(res.data.msg);
    //发请求更新博客
    bolgInfo.value = "list";
    loadArticle();
  } else {
    message.error(res.data.msg);
  }
};
//删除
const deleteBolgInfo = async bolg => {
  // const id = bolg.id;
  // let res = await axios.delete("/blog/_token/delete?id="+id);
  // if (res.data.code == 200) {
  //   message.info(res.data.msg);
  //   //发请求更新博客
  //   bolgInfo.value = "list";
  //   loadArticle();
  // } else {
  //   message.error(res.data.msg);
  // }

  //删除提示
  dialog.warning({
    title: "警告",
    content: "是否删除",
    positiveText: "删除",
    negativeText: "取消",
    onPositiveClick: async () => {
      message.success("确定");
      const id = bolg.id;
      let res = await axios.delete("/blog/_token/delete?id=" + id);
      if (res.data.code == 200) {
        //发请求更新博客
        bolgInfo.value = "list";
        loadArticle();
        message.info(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
    },
    onNegativeClick: () => {
      message.error("取消");
    }
  });
};
</script>

<style lang="scss" scoped>
</style>