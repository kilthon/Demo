import { createI18n } from 'vue-i18n';

const zh = {
  content: '你好,欢迎来到{route}',
  menuName: '{user}权限{id}',
  home: '首页',
  dark: '暗黑',
  light: '明亮',
  lang: 'English',
  subtitle: '这是一个副标题',
};

const en = {
  content: 'hello, welcome to {route}',
  menuName: '{user}auth{id}',
  home: 'Home',
  dark: 'dark',
  light: 'light',
  lang: '中文',
  subtitle: 'this is a subtitle',
};

const messages = {
  zh,
  en,
};

const i18n = createI18n({
  messages,
  locale: 'zh',
});

export default i18n;
