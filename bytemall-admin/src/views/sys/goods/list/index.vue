<template>
  <BasicTable @register="registerTable">
    <template #img="{ record }">
      <TableImg :imgList="[record.head_img[0]]" size="60" />
    </template>

    <template #price="{ record }">
      {{ record.min_price / 100 }}
    </template>

    <!-- 操作列 -->
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            label: '详情',
            onClick: handleDetail.bind(null, record),
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction, TableImg } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './index';
  import { useGo } from '/@/hooks/web/usePage';
  import { listApi } from '/@/api/sys/goods';

  export default defineComponent({
    name: 'GoodsList',
    components: { BasicTable, TableAction, TableImg },
    setup() {
      const [registerTable] = useTable({
        title: '客户列表',
        api: listApi,
        columns: getBasicColumns(),
        useSearchForm: true,
        formConfig: getFormConfig(),
        showTableSetting: true,
        showIndexColumn: false,
        actionColumn: {
          width: 160,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });

      const go = useGo();

      function handleDetail(record: Recordable) {
        go(`/goods/detail?id=${record.product_id}`);
      }

      return {
        registerTable,
        handleDetail,
      };
    },
  });
</script>
