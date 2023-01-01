<template>
        <!-- 封装富文本编辑器 -->
        <div>
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        style="height: 100px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>

<script setup>
import "@wangeditor/editor/dist/css/style.css";
import { AdminStore } from "../stores/AdminStore";
import {
  ref,
  reactive,
  onBeforeUnmount,
  shallowRef,
  inject,
  onMounted,
  defineEmits,
  defineProps,
  nextTick
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import src from "vueuc/lib/virtual-list/src";
// import { value } from "dom7";
const server_url = inject("server_url");
// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef();
const editorConfig = { placeholder: "请输入内容..." };
editorConfig.MENU_CONF = {};
editorConfig.MENU_CONF["uploadImage"] = {
  server: server_url + `/upload/upload_deitor`,
  // 小于该值就插入 base64 格式（而不上传），默认为 0
  base64LimitSize: 10 * 1024 // 10kb
};
//上传图片
editorConfig.MENU_CONF["insertImage"] = {
  parseImageSrc: async () => {
    if (src.indexOf("http" !== 0)) {
      return `${server_url}${src}`;
    } else {
      return src;
    }
  }
};
//默认配置
const toolbarConfig = {};
const mode = ref("default");
// 内容 HTML
const valueHtml = ref("");
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});
//自定义事件触发
const emit = defineEmits(["update:model-value"]);
//组件挂载
onMounted(async () => {
  await nextTick(() => {
    valueHtml.value = props.modelValue;
  });
});
// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});
// 编辑器回调函数
const handleCreated = editor => {
  //   console.log("created", editor);
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const handleChange = editor => {
  //   console.log("change:", editor.getHtml());
  emit("update:model-value", valueHtml.value);
};
</script>

<style lang="scss" scoped>
</style>