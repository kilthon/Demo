import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import i18n from './util/i18n'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import './assets/css/index.css'

const app=createApp(App)

app.use(router).use(store).use(Antd).use(i18n).mount('#app')
