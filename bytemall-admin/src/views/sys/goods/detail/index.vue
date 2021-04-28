<template>
  <PageWrapper title="商品详情">
    <BasicForm @register="register">
      <!-- 商品图 -->
      <template #img="{ model }">
        <div class="head-img-wrap">
          <div v-for="item in model.head_img" :key="item" class="head-img-item-wrap">
            <Image :src="item" :width="100" />
          </div>
        </div>
      </template>

      <!-- 商品价格 -->
      <template #price="{ model }">
        <InputNumber
          v-model:value="model.min_price"
          :formatter="(value) => value / 100"
          :parser="(value) => value / 100"
          placeholder="商品价格"
        />
      </template>
    </BasicForm>
  </PageWrapper>
</template>
<script lang="ts">
  import { BasicForm, useForm } from '/@/components/Form';
  import { Image, InputNumber } from 'ant-design-vue';
  import { defineComponent, onMounted } from 'vue';
  import { schemas } from './data';
  import { PageWrapper } from '/@/components/Page';
  import { useRoute } from 'vue-router';
  import { listApi } from '/@/api/sys/goods';

  export default defineComponent({
    components: { BasicForm, PageWrapper, Image, InputNumber },
    setup() {
      const route = useRoute();
      const [register, { setFieldsValue }] = useForm({
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 10,
        },
        schemas: schemas,
        showActionButtonGroup: false,
      });

      onMounted(async () => {
        const res = await listApi({
          productId: route.query.id,
        });
        setFieldsValue({
          ...res.list[0],
        });
      });

      return { register };
    },
  });
</script>
<style lang="less" scoped>
  .form-wrap {
    padding: 24px;
    background-color: @component-background;
  }

  .head-img-wrap {
    display: flex;
    margin: 10px;

    .head-img-item-wrap {
      width: 100px;
      height: 100px;
      margin-right: 10px;
    }
  }
</style>
