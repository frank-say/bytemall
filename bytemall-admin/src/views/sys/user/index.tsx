import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      fixed: 'left',
      width: 200,
    },
    {
      title: 'openid',
      dataIndex: 'openid',
    },
    {
      title: 'unionid',
      dataIndex: 'unionid',
    },
    {
      title: '手机号',
      dataIndex: 'mobile',
    },
  ];
}

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [
      {
        field: `mobile`,
        label: `手机号`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 6,
        },
      },
      {
        field: `openid`,
        label: `OpenId`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 6,
        },
      },
      {
        field: `unionid`,
        label: `UnionId`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 6,
        },
      },
    ],
  };
}
