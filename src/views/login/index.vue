<template>
  <div class="login-page">
    <CommonNavbarLayout title="登录木迹" backUrl="/">
      <login-form/>
      <login-footer/>
    </CommonNavbarLayout>
  </div>
</template>

<script>
// import { LoginForm, LoginFooter } from '@/components/login';

export default {
  name: "login-page",
  created() {
    window.$cookies.remove("username");
    window.$cookies.remove("password");
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-weight: 400;
}
</style>
