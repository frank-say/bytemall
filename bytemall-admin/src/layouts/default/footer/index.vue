<template>
  <Footer :class="prefixCls" v-if="getShowLayoutFooter">
    <div :class="`${prefixCls}__links`">
      <a @click="openWindow(SITE_URL)">在线预览</a>

      <GithubFilled @click="openWindow(GITHUB_URL)" :class="`${prefixCls}__github`" />

      <a @click="openWindow(DOC_URL)">在线文档</a>
    </div>
    <div>Copyright &copy;{{ fullYear }} bytemall Admin</div>
  </Footer>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { GithubFilled } from '@ant-design/icons-vue';

  import { DOC_URL, GITHUB_URL, SITE_URL } from '/@/settings/siteSetting';
  import { openWindow } from '/@/utils';

  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer, GithubFilled },
    setup() {
      const { getShowFooter } = useRootSetting();
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-footer');

      const fullYear = new Date().getFullYear();

      const getShowLayoutFooter = computed(() => {
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
      });

      return {
        getShowLayoutFooter,
        prefixCls,
        DOC_URL,
        GITHUB_URL,
        SITE_URL,
        openWindow,
        fullYear,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(0, 0, 0, 0.85);

  .@{prefix-cls} {
    color: @normal-color;
    text-align: center;

    &__links {
      margin-bottom: 8px;

      a {
        color: @normal-color;

        &:hover {
          color: @hover-color;
        }
      }
    }

    &__github {
      margin: 0 30px;

      &:hover {
        color: @hover-color;
      }
    }
  }
</style>
