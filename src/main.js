import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import i18n from './util/i18n';
import 'ant-design-vue/dist/antd.less';
import './assets/css/index.css';

const app = createApp(App);

app.use(router).use(store).use(Antd).use(i18n).mount('#app');
