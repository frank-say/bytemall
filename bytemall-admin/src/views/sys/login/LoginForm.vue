<template>
  <LoginFormTitle v-show="getShow" class="enter-x" />

  <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef" v-show="getShow">
    <FormItem name="account" class="enter-x">
      <Input size="large" v-model:value="formData.account" placeholder="请输入用户名" />
    </FormItem>
    <FormItem name="password" class="enter-x">
      <InputPassword
        size="large"
        visibilityToggle
        v-model:value="formData.password"
        placeholder="请输入密码"
      />
    </FormItem>

    <FormItem class="enter-x">
      <Button type="primary" size="large" block @click="handleLogin" :loading="loading">
        登录
      </Button>
      <Button type="dashed" size="large" block @click="showModal" class="attention-btn">
        获取体验账号
      </Button>
    </FormItem>
  </Form>

  <Modal v-model:visible="visible" title="公众号二维码" @ok="handleOk" centered>
    <div class="attention-content">
      <div class="attention-content-desc">
        关注
        <span class="attention-content-tip">公众号</span>
        回复
        <span class="attention-content-tip">体验</span>
        获取体验账号
      </div>
      <img src="../../../assets/images/official_account.jpg" alt="" class="w-1/2" />
    </div>
  </Modal>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRaw, unref, computed } from 'vue';

  import { Form, Input, Row, Col, Button, Modal } from 'ant-design-vue';
  import LoginFormTitle from './LoginFormTitle.vue';

  import { useMessage } from '/@/hooks/web/useMessage';

  import { useUserStore } from '/@/store/modules/user';
  import { LoginStateEnum, useLoginState, useFormRules, useFormValid } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { onKeyStroke } from '@vueuse/core';

  export default defineComponent({
    name: 'LoginForm',
    components: {
      [Col.name]: Col,
      [Row.name]: Row,
      Button,
      Form,
      FormItem: Form.Item,
      Input,
      Modal,
      LoginFormTitle,
      InputPassword: Input.Password,
    },
    setup() {
      const { notification } = useMessage();
      const { prefixCls } = useDesign('login');
      const userStore = useUserStore();

      const { setLoginState, getLoginState } = useLoginState();
      const { getFormRules } = useFormRules();

      const formRef = ref();
      const loading = ref(false);
      const rememberMe = ref(false);
      const visible = ref(false);

      const showModal = () => {
        visible.value = true;
      };

      const handleOk = (e: MouseEvent) => {
        console.log(e);
        visible.value = false;
      };

      const formData = reactive({
        account: 'admin',
        password: '',
      });

      const { validForm } = useFormValid(formRef);

      onKeyStroke('Enter', handleLogin);

      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.LOGIN);

      async function handleLogin() {
        const data = await validForm();
        if (!data) return;
        try {
          loading.value = true;
          const userInfo = await userStore.login(
            toRaw({
              password: data.password,
              username: data.account,
            })
          );
          if (userInfo) {
            notification.success({
              message: '登录成功',
              description: `欢迎回来: ${userInfo.realName}`,
              duration: 3,
            });
          }
        } finally {
          loading.value = false;
        }
      }

      return {
        prefixCls,
        formRef,
        formData,
        getFormRules,
        rememberMe,
        handleLogin,
        loading,
        setLoginState,
        LoginStateEnum,
        getShow,
        visible,
        showModal,
        handleOk,
      };
    },
  });
</script>

<style scoped lang="less">
  .attention-btn {
    margin-top: 10px;
  }

  .attention-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;

    .attention-content-desc {
      width: 100%;
      margin-bottom: 5px;
      font-size: 18px;
      color: #303133;
      text-align: center;
    }

    .attention-content-tip {
      color: #409eff;
    }
  }
</style>
