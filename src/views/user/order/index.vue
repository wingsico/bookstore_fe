<template>
  <div class="order-page">
    <CommonNavbarLayout title="我的订单">
      <div class="wrapper">
        <van-tabbar v-model="tabbar.active" class="tabbar">
          <van-tabbar-item v-for="item in tabbar.map" :key="item.text" class="item" :to="item.to" replace>
            <span class="text">{{item.text}}</span>
          </van-tabbar-item>
        </van-tabbar>
        <router-view></router-view>
      </div>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import isEmpty from "lodash/isEmpty";

export default {
  name: "order-page",
  data() {
    return {
      tabbar: {
        active: 0,
        map: [
          {
            to: '/user/order/all_list',
            text: '全部订单'
          },
          {
            to: '/user/order/pay_list',
            text: '待付款'
          },
          {
            to: '/user/order/get_list',
            text: '待收货'
          },
          {
            to: '/user/order/finish_list',
            text: '已完成'
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    ...mapActions([ 'getOrderList']),
    handleBackClick() {
      this.$router.go(-1);
    }
  },
  created() {
    console.log(this.user.user_id)
    this.getOrderList(this.user.user_id);
  }
};
</script>

<style lang="scss" scoped>
.order-page {
  .tabbar {
    position: relative;
    height: 44px;
    .item {
      .text {
        position: relative;
        display: inline-block;
        height: 44px;
        line-height: 44px;
        font-size: 14px;
        color: #333;
      }
    }
    .van-tabbar-item--active {
      .text {
        color: #e93b3d;
        &:before {
          content: "";
          position: absolute;
          bottom: 3px;
          left: 0;
          right: 0;
          height: 3px;
          background: #e93b3d;
        }
      }
    }
  }
}
</style>
