import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const goods: AppRouteModule = {
  path: '/goods',
  name: 'Goods',
  component: LAYOUT,
  redirect: '/goods/list',
  meta: {
    icon: 'ant-design:gift-outlined',
    title: '商品管理',
  },
  children: [
    {
      path: 'list',
      name: 'goodsList',
      component: () => import('/@/views/sys/goods/list/index.vue'),
      meta: {
        title: '商品管理',
        icon: 'ant-design:gift-outlined',
      },
    },
    {
      path: 'detail',
      name: 'goodsDetail',
      component: () => import('/@/views/sys/goods/detail/index.vue'),
      meta: {
        title: '商品详情',
      },
    },
  ],
};

export default goods;
