<template>
  <div class="login-page">
    <van-nav-bar
      @click-left="handleBackClick"
    >
      <div class="title" slot="title">书虫屋登录</div>
      <van-icon name="arrow-left" slot="left" color="#333" />
    </van-nav-bar>
    <login-form />
    <login-footer />
  </div>
</template>

<script>
import { NavBar, Icon } from 'vant';
import { LoginForm, LoginFooter } from '@/components/login';

export default {
  name: 'login-page',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    handleBackClick() {
      this.$router.go(-1);
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Icon.name]: Icon,
    LoginForm,
    LoginFooter,
  },
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 400;
}
</style>
