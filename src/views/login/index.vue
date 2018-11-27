<template>
  <div class="login-page">
    <nav-bar
      title="书虫屋登陆"
      left-arrow
      @click-left="handleBackClick"
    />
    <login-form />
  </div>
</template>

<script>
import { NavBar } from 'vant';
import { LoginForm } from '@/components/login';

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
    NavBar,
    LoginForm,
  },
};
</script>

<style lang="sass" scoped>
</style>
