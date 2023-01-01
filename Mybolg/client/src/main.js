import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
//pinia
const app = createApp(App)
import { createPinia } from "pinia";
const store = createPinia()
    //使用vue3专属组件库
import naive from 'naive-ui'
// 引入全局使用的api
import { createDiscreteApi } from 'naive-ui'
const { message, notification, dialog } = createDiscreteApi(['message', 'dialog', 'notification'])

app.use(naive)
app.use(store)
    //axios
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8080'
    //element-ui
import { AdminStore } from './stores/AdminStore'
const adminStore = AdminStore()
axios.interceptors.request.use((config) => {
    config.headers.token = adminStore.token
    return config
})
const server_url = axios.defaults.baseURL
    // 引入路由
import { router } from './common/router'
app.use(router)
    //提供依赖
app.provide('axios', axios)
app.provide('message', message)
app.provide('notification', notification)
app.provide('dialog', dialog)
    //将基础地址provide出去
app.provide('server_url', server_url)


app.mount('#app')