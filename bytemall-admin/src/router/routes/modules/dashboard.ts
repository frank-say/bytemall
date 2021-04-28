import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const dashboard: AppRouteModule = {
  path: '/dashboard',
  name: 'Dashboard',
  component: LAYOUT,
  redirect: '/dashboard/index',
  meta: {
    icon: 'ion:grid-outline',
    title: '首页',
  },
  children: [
    {
      path: 'index',
      name: 'dashboardPage',
      component: () => import('../../../views/dashboard/index.vue'),
      meta: {
        icon: 'ion:grid-outline',
        title: '首页',
        affix: true,
      },
    },
  ],
};

export default dashboard;
