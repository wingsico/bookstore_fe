<template>
  <div class="cart-page">
    <CommonNavbarLayout title="购物车">
      <div class="no-login" v-if="!isLogin">
      <div class="shopcart-empty-wrap">
        <img :src="require(`@/assets/empty-cart.png`)" class="empty-icon">
        <p class="empty-text">登录后可同步购物车中商品</p>
        <router-link tag="div" class="login-btn" to="/login">登录</router-link>
      </div>
      <CommonDivider type="horizontal"/>
      <div class="guess-like">
        <h3 class="title">猜 你 喜 欢</h3>
        <div class="container"></div>
      </div>
    </div>
    <div class="logined" v-else>
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit" class="submit-bar van-hairline--top">
        <van-checkbox v-model="checked" class="check-all">全选</van-checkbox>
      </van-submit-bar>
    </div>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "cart-page",
  computed: {
    ...mapGetters(["user"]),
    isLogin() {
      return !isEmpty(this.user);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-page {
  .no-login {
    padding: 0 20px;
    .guess-like {
      position: relative;
      background: #fff;
      .title {
        margin: 0;
        position: absolute;
        top: -36px;
        left: 50%;
        transform: translateX(-50%);
        font-weight: 400;
        font-size: 12px;
        color: #ccc;
        background: #fff;
        padding: 5px 15px;
        text-align: center;
        &::after,
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          margin-top: -1.5px;
          width: 4px;
          height: 4px;
          background-color: #ccc;
          -webkit-transform: rotate(45deg);
          transform: rotate(45deg);
        };
        &::after {
          right: 0;
        }
        &::before {
          left: 0;
        }
      }
    }
  }

  .shopcart-empty-wrap {
    padding: 30px 0 15px;
    text-align: center;

    .empty-icon {
      width: 90px;
      height: 90px;
    }

    .empty-text {
      font-size: 16px;
      color: rgba(51, 51, 51, 0.66);
      line-height: 24px;
      margin: 11px 0;
    }

    .login-btn {
      width: 60px;
      height: 30px;
      border: 1px solid #e4393c;
      color: #e4393c;
      font-size: 14px;
      line-height: 30px;
      border-radius: 4px;
      margin: 0 auto 15px;
    }
  }

  .submit-bar {
    bottom: 50px;
    background-color: hsla(0,0%,100%,.95);
    .check-all {
      margin-left: 40px;
    }
  }
  margin-bottom: 50px;
}
</style>
