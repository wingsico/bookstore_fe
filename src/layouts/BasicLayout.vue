<template>
  <div class="basic-layout">
    <router-view :class="{'tab-container': displayTabbar}"></router-view>
    <van-tabbar v-model="active" class="tabbar" v-if="displayTabbar">
      <van-tabbar-item icon="home" to="/" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/user">{{ userTabBarName }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import isEmpty from 'lodash/isEmpty';

const map = {
  '': 0,
  '/': 0,
  '/cart': 1,
  '/user': 2,
}

export default {
  name: 'basic-layout',
  data() {
    return {
      active: 0,
    }
  },
  methods: {
    ...mapActions(['login']),
    checkActiveRouter({fullPath}) {
      this.active = map[fullPath];
    },
  },
  computed: {
    ...mapGetters(['user']),
    userTabBarName() {
      return !isEmpty(this.user) ? '我的': '未登录'
    },
    displayTabbar() {
      return Object.keys(map).includes(this.$route.fullPath);
    },

  },
  beforeRouteUpdate (to, from, next) {
    next();
    this.checkActiveRouter(to);
  },
  created() {
    this.checkActiveRouter(this.$route)
  }
};
</script>

<style lang="scss" scoped>
  .basic-layout {
    .tab-container {
      padding-bottom: 60px;
      background-color: #f7f7f7;
    }
    .tabbar {
      box-shadow: 0 0 10px 0 hsla(0,6%,58%,.6);
      .van-tabbar-item--active {
        color: #cd2525;
      }
      height: 50px;
    }
  }
</style>
