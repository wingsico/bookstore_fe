<template>
  <div>
    <router-view></router-view>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="chat">购物车</van-tabbar-item>
      <van-tabbar-item icon="records" to="/login">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
export default {
  data() {
    return {
      active: 0,
    }
  },
  methods: {

  },
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
  },
};
</script>
