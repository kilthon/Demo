import { h, resolveComponent } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue'),
  },
  {
    path: '/404',
    name: 'notFound',
    component: () => import('../views/NotFound.vue'),
  },
  {
    path: '/:W+',
    component: () => import('../views/BaseLayout.vue'),
    name: 'BaseLayout',
    redirect: '/404',
    hidden: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const userId = sessionStorage.getItem('userId');
  const userMenu = JSON.parse(sessionStorage.getItem('userMenu'));
  if (to.path !== '/login') {
    if (userId && userMenu) {
      userMenu.forEach((item) => {
        const newObj = item;
        newObj.component = Home;
        if (newObj.children !== undefined) {
          const arr = [];
          newObj.children((child) => {
            arr.push({
              path: child.path.slice(1),
              name: child.path.slice(1),
              component: Home,
              meta: child.meta,
            });
          });
          newObj.children = arr;
          newObj.component = {
            render: () => h(resolveComponent('router-view')),
          };
        }
        router.addRoute(item);
      });
      const curRoutes = router.getRoutes();
      const obj = curRoutes.find((item) => item.path === to.path);
      if (!obj && !routes.includes(to.path)) {
        next('/404');
      } else if (
        to.path === '/404' &&
        to.redirectedFrom !== undefined &&
        curRoutes.find((item) => item.path === to.redirectedFrom.fullPath)
      ) {
        next({ path: to.redirectedFrom.fullPath, replace: true });
      } else next();
    } else {
      window.sessionStorage.clear();
      next('/login');
    }
  } else {
    next();
  }
});

export default router;
