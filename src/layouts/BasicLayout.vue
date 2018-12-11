<template>
  <div class="basic-layout">
    <keep-alive include="home-page">
      <router-view :class="{'tab-container': displayTabbar}"></router-view>
    </keep-alive>
    <van-tabbar v-model="active" class="tabbar" v-if="displayTabbar" @change="backToTop">
      <van-tabbar-item icon="home" to="/" replace>首页</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart" :info="goodsCount">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" :to="userRouteUrl">{{ userTabBarName }}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import isEmpty from "lodash/isEmpty";

const map = {
  "": 0,
  "/": 0,
  "/cart": 1,
  "/user": 2
};

export default {
  name: "basic-layout",
  data() {
    return {
      active: 0
    };
  },
  methods: {
    ...mapActions(["login"]),
    checkActiveRouter() {
      this.active = map[this.$route.fullPath];
    },
    hiddenFilter(tabbar = []) {
      const hiddens = ['/cart'];
      return tabbar.filter(bar => !hiddens.includes(bar));
    },
    backToTop() {
      window.scrollTo(0, 0);
    }
  },
  computed: {
    ...mapGetters(["user", "cartGoods"]),
    userTabBarName() {
      return !isEmpty(this.user) ? "我的" : "未登录";
    },
    userRouteUrl() {
      return !isEmpty(this.user) ? "/user" : "/login";
    },
    displayTabbar() {
      const tabbar = Object.keys(map);
      const filterTabbar = this.hiddenFilter(tabbar);
      return filterTabbar.includes(this.$route.fullPath) || this.$route.fullPath === '/cart' && this.cartGoods.length === 0;
    },
    goodsCount() {
      return this.cartGoods.length;
    }
  },
  watch: {
    '$route'() {
      this.checkActiveRouter();
    }
  },
  created() {
    this.checkActiveRouter();
  }
};
</script>

<style lang="scss" scoped>
.basic-layout {
  .tab-container {
    padding-bottom: 50px;
  }
  .tabbar {
    box-shadow: 0 0 10px 0 hsla(0, 6%, 58%, 0.6);
    height: 50px;
    z-index: 100 !important;
    .van-tabbar-item--active {
      color: #cd2525;
    }
  }
}
</style>
