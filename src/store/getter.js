const userId = JSON.parse(sessionStorage.getItem('userId'));
const userMenu = JSON.parse(sessionStorage.getItem('userMenu'));
const styleConfig = JSON.parse(sessionStorage.getItem('styleConfig'));

const menu = () => {
  const arr = [];
  if (userMenu && userId !== null) {
    let index = 0;
    userMenu.forEach((item) => {
      if (item.children) {
        item.children.forEach((child) => {
          const chld = child;
          chld.meta = { key: child.id, subMn: item.meta.key };
        });
      }
      const obj = {
        id: (index += 1),
        name: item.name,
        path: item.path,
        children: item.children,
      };
      arr.push(obj);
    });
  }
  return arr;
};

const userInfo = () => {
  const isLogin = !!userId;
  let userName;
  if (userId === 0) {
    userName = 'admin';
  } else if (userId === 1) {
    userName = 'user1';
  } else if (userId === 2) {
    userName = 'user2';
  }
  const obj = { isLogin, userId, userName };
  return obj;
};

const routes = () => {
  const routesList = userMenu;
  if (userMenu && userId !== null) {
    routesList.forEach((item) => {
      const obj = item;
      obj.name = item.path.slice(1);
    });
  }
  return routesList;
};

const config = () => {
  let obj;
  if (!styleConfig) obj = { theme: false, lang: 'zh' };
  else obj = styleConfig;
  return obj;
};

const getters = {
  routes,
  userInfo,
  menu,
  config,
};

export default getters;
