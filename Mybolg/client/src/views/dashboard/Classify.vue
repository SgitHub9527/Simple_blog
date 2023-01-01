<template>
    <div>
<n-button @click="showModal = true">添加</n-button>
<n-table class="n_table" :border="false" :single-line="false" style="textAlign:center">
    <thead>
        <tr>
            <th>编号</th>
            <th>名称</th>
            <th>操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="(category,index) in categoryList">
            <td>{{ category.id}}</td>
            <td>{{ category.name }}</td>
            <td>
                <n-space>
                    <n-button type="info" @click="toUpdata(category)">修改</n-button>
                    <n-button type="error" @click="deleteCategory(category)">删除</n-button>
                </n-space>
            </td>
        </tr>
    </tbody>
</n-table>
<!-- 对话框 -->
<n-modal
    v-model:show="showModal"
    preset="dialog"
    :style="bodyStyle"
    title="Dialog"
    :bordered="false"
    :segmented="segmented"
  >
    <template #header-extra>
        <div>添加分类</div>
    </template>
    <div>
        <n-input v-model:value="addCategory.name"  placeholder="请输入名称"></n-input>
    </div>
    <template #action>
        <div>
            <n-button @click="add">提交</n-button>
        </div>
    </template>
</n-modal>
<n-modal
    v-model:show="showUpdataModal"
    preset="dialog"
    :style="bodyStyle"
    title="Dialog"
    :bordered="false"
    :segmented="segmented"
  >
    <template #header-extra>
        <div>修改分类</div>
    </template>
    <div>
        <n-input v-model:value="updataCategory.name"  placeholder="请输入名称"></n-input>
    </div>
    <template #action>
        <div>
            <n-button @click="updata">修改</n-button>
        </div>
    </template>
</n-modal>
    </div>
</template>

<script>
import { reactive, ref, onMounted, inject } from "vue";
import { useRouter, useRoute } from "vue-router";
import { AdminStore } from "../../stores/AdminStore";
export default {
  setup() {
    //路由实例化
    const route = useRoute();
    const router = useRouter();
    const axios = inject("axios");
    const message = inject("message");
    const dialog = inject("dialog");
    const adminStore = AdminStore();
    const showModal = ref(false);
    const showUpdataModal = ref(false);
    const categoryList = ref([]);
    const addCategory = reactive({
      name: null
    });
    const updataCategory = reactive({
      id: null,
      name: null
    });
    onMounted(() => {
      loadDatas();
    });
    const loadDatas = async () => {
      let res = await axios.get("/category/list");
      categoryList.value = res.data.result;
    };
    //添加分类
    const add = async () => {
      // post请求第三个参数{header:{'token':adminStore.token}}
      let res = await axios.post("/category/_token/add", {
        name: addCategory.name
      });
      //token存在
      if (res.data.code == 200) {
        loadDatas();
        message.info(res.data.msg);
      } else {
        message.error(res.data.msg);
      }
      showModal.value = false;
      addCategory.name = null;
    };
    //删除分类
    const deleteCategory = async category => {
      dialog.warning({
        title: "警告",
        content: "是否删除",
        positiveText: "删除",
        negativeText: "取消",
        onPositiveClick: async () => {
          message.success("确定");

          let res = await axios.delete(
            `/category/_token/delete?id=${category.id}`
          );
          if (res.data.code == 200) {
            loadDatas();
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
    //修改
    const toUpdata = async category => {
      showUpdataModal.value = true;
      updataCategory.id = category.id;
      updataCategory.name = category.name;
    };
    const updata = async () => {
      let res = await axios.put("/category/_token/update", {
        id: updataCategory.id,
        name: updataCategory.name
      });
      //token存在
      if (res.data.code == 200) {
        loadDatas();
        message.info(res.data.msg);
      showUpdataModal.value = false;

      } else {
        message.error(res.data.msg);
      }
      showModal.value = false;
    };
    return {
      showModal,
      categoryList,
      addCategory,
      add,
      deleteCategory,
      showUpdataModal,
      updataCategory,
      toUpdata,
      updata
    };
  }
};
</script>

<style lang="scss" scoped>
body {
  position: relative;
}
.n_table {
  width: 60vw;
  position: absolute;
  left: auto;
}
</style>