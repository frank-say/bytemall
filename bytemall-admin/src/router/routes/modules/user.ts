import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const user: AppRouteModule = {
  path: '/user',
  name: 'User',
  component: LAYOUT,
  redirect: '/user/index',
  meta: {
    icon: 'ant-design:user-outlined',
    title: '客户管理',
  },
  children: [
    {
      path: 'index',
      name: 'userPage',
      component: () => import('/@/views/sys/user/index.vue'),
      meta: {
        title: '客户管理',
        icon: 'ant-design:user-outlined',
      },
    },
  ],
};

export default user;
