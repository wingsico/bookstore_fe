<template>
  <div class="cart-page">
    <CommonNavbarLayout title="购物车">
      <div class="no-login" v-if="!isLogin">
        <div class="shopcart-empty-wrap">
          <img :src="require(`@/assets/empty-cart.png`)" class="empty-icon">
          <p class="empty-text">登录后可同步购物车中商品</p>
          <router-link tag="div" class="login-btn" to="/login">登录</router-link>
        </div>
        <CommonRecommendList/>
      </div>
      <div class="logined" v-else>
        <div v-if="cartGoods.length > 0">
          <keep-alive>
            <van-list class="cart-list">
              <CartGood
                v-for="(good, index) in cartGoods"
                :checked="good.checked"
                :key="good.bookID"
                :id="good.bookID"
                :title="good.title"
                :cover_url="good.cover_url"
                :price="good.price"
                :number="good.number"
                :index="index"
                @checkedChange="checkedChange"
                @countChange="countChange"
                @delete="handleGoodDelete"
                class="cart-good-item"
              />
            </van-list>
          </keep-alive>
          <van-submit-bar
            :price="totalPrice"
            button-text="提交订单"
            class="submit-bar van-hairline--top"
            @submit="submitOrder"
          />
        </div>
        <div v-else>
          <div class="shopcart-empty-wrap">
            <img :src="require(`@/assets/empty-cart.png`)" class="empty-icon">
            <p class="empty-text">购物车里空空如也~快去逛逛吧~</p>
          </div>
          <CommonRecommendList/>
        </div>
      </div>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "cart-page",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user", "cartGoods", "cartOrder"]),
    isLogin() {
      return !isEmpty(this.user);
    },
    checkedGoods() {
      return this.cartGoods.filter(good => good.checked);
    },
    totalPrice() {
      return (
        this.checkedGoods.reduce(
          (acc, cur) => acc + cur.number * cur.price,
          0
        ) * 100
      );
    }
  },
  methods: {
    ...mapActions([
      "getCartGoods",
      "setGoodChecked",
      "setGoodCount",
      "submitCartOrder",
      "deleteCartGood"
    ]),
    checkedChange(checked, index) {
      this.setGoodChecked({ checked, index });
    },
    countChange(number, index) {
      this.setGoodCount({ number, index });
    },
    async submitOrder() {
      await this.submitCartOrder(this.checkedGoods.map(good => good.bookID));
      this.$router.push("/cart/order?order_id=" + this.cartOrder.orderID);
    },
    async handleGoodDelete(bookID) {
      try {
        await this.deleteCartGood(bookID);
        this.$toast("删除成功!");
      } catch (e) {
        this.$toast(e.message);
      }
    }
  },
  created() {
    if (this.cartGoods.length === 0 && !isEmpty(this.user)) {
      this.getCartGoods(this.user.user_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.cart-page {
  .no-login {
    padding: 0 20px;
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

  .logined {
    padding: 10px 20px 0px 10px;
    position: relative;
    background-color: #fff;
    z-index: 100;
    .cart-list {
      margin-top: 10px;
      .cart-good-item {
        margin-bottom: 20px;
      }
    }
  }

  .submit-bar {
    background-color: hsla(0, 0%, 100%, 0.95);
    z-index: 1111;
    .check-all {
      margin-left: 40px;
    }
  }
}
</style>
