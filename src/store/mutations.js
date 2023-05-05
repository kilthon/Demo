import router from '../router/index';

const generateRoutes = (state, data) => {
  const newObj = state;
  newObj.paths = [];

  data.menu.forEach((item) => {
    const obj = {
      path: item.path,
      name: item.name,
      children: item.children,
      meta: { key: item.id },
    };
    state.paths.push(obj);
    router.addRoute(obj);
  });

  window.sessionStorage.setItem('userId', data.userInfo.userId);
  window.sessionStorage.setItem('userMenu', JSON.stringify(state.paths));
};

const mutations = {
  generateRoutes,
};

export default mutations;
