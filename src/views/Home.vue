<template>
  <Header></Header>
  <a-switch
    style="display: inline-block; margin-right: 10px"
    :checked="themeChecked"
    :checked-children="$t('dark')"
    :un-checked-children="$t('light')"
    @change="changeTheme"
  />
  <a-button style="display: inline-block" @click="changeLang" id="langBtn">{{
    i18n.global.locale === 'zh' ? 'English' : '中文'
  }}</a-button>
  <br />
  <br />
  <div class="wrapper" style="display: inline-block; margin-right: 10px">
    <Menu class="myMenu" style="float: left"></Menu>
    <div>
      <a-select
        v-model:value="value1"
        style="width: 120px"
        @change="handleChange"
      >
        <a-select-option value="0">admin</a-select-option>
        <a-select-option value="1">user1</a-select-option>
        <a-select-option value="2">user2</a-select-option>
      </a-select>
    </div>
  </div>
  <div style="display: inline-block; vertical-align: top">
    <component :is="cmp"></component>
  </div>
</template>

<script setup>
import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';
import Admin from '../components/Admin.vue';
import User1 from '../components/User1.vue';
import User2 from '../components/User2.vue';
import { useStore } from 'vuex';
import { reactive, onMounted, ref, markRaw } from 'vue';
import { toggleTheme } from '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils';
import i18n from '../util/i18n';

const store = useStore();
const authList = reactive([]);
const style = ref();
const themeChecked = ref();

const cmp = ref();
if (store.getters.userInfo.userId === 0) {
  cmp.value = markRaw(Admin);
} else if (store.getters.userInfo.userId === 1) {
  cmp.value = markRaw(User1);
} else {
  cmp.value = markRaw(User2);
}
const value1 = ref(store.getters.userInfo.userName);

const handleChange = async function (val) {
  await store.dispatch('userChange', val);
  authList.value = store.getters.menu;
};

const changeTheme = (value) => {
  if (value) {
    toggleTheme({
      scopeName: 'theme-dark',
    });
  } else {
    toggleTheme({
      scopeName: 'theme-light',
    });
  }
  themeChecked.value = !themeChecked.value;
  let obj = { theme: themeChecked.value, lang: i18n.global.locale };
  window.sessionStorage.setItem('styleConfig', JSON.stringify(obj));
};

const changeLang = (e) => {
  i18n.global.locale = i18n.global.locale === 'zh' ? 'en' : 'zh';
  // 手动让按钮失焦
  let target = e.target;
  if (target.nodeName === 'SPAN') {
    target = e.target.parentNode;
  }
  target.blur();
  let obj = { theme: themeChecked.value, lang: i18n.global.locale };
  window.sessionStorage.setItem('styleConfig', JSON.stringify(obj));
};

onMounted(() => {
  authList.value = store.getters.menu;
  style.value = store.getters.config;
  themeChecked.value = style.value.theme;
  i18n.global.locale = style.value.lang;
  toggleTheme({
    scopeName: themeChecked.value ? 'theme-dark' : 'theme-light',
  });
});
</script>

<style lang="less">
.wrapper::after {
  content: '';
  visibility: hidden;
  display: block;
  height: 0;
  clear: both;
}
</style>
