import { FormSchema } from '/@/components/Form';

export const schemas: FormSchema[] = [
  {
    field: 'product_id',
    component: 'Input',
    label: '商品ID',
    componentProps: {
      placeholder: '商品ID',
    },
    required: true,
  },
  {
    field: 'title',
    component: 'Input',
    label: '商品名称',
    componentProps: {
      placeholder: '商品名称',
    },
    required: true,
  },
  {
    field: 'sub_title',
    component: 'Input',
    label: '商品备注',
    componentProps: {
      placeholder: '商品备注',
    },
  },
  {
    field: 'min_price',
    component: 'Input',
    label: '商品价格',
    componentProps: {
      placeholder: '商品价格',
    },
    required: true,
    slot: 'price',
  },
  {
    field: 'head_img',
    component: 'Input',
    label: '商品图片',
    slot: 'img',
  },
];
