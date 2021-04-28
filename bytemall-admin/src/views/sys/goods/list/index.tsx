import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '商品ID',
      dataIndex: 'product_id',
      fixed: 'left',
      width: 200,
    },
    {
      title: '商品图片',
      dataIndex: 'head_img',
      slots: { customRender: 'img' },
    },
    {
      title: '商品名称',
      dataIndex: 'title',
    },
    {
      title: '商品备注',
      dataIndex: 'sub_title',
    },
    {
      title: '价格',
      dataIndex: 'min_price',
      slots: { customRender: 'price' },
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `productId`,
        label: `商品ID`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 6,
        },
      },
      {
        field: `keyword`,
        label: `商品名称`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 6,
        },
      },
    ],
  };
}
