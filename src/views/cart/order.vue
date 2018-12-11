<template>
  <CommonNavbarLayout :title="cartOrder.status !== 2 ? '支付订单' : '已完成该订单'">
    <div class="order-confirm-page">
      <div class="cell-card">
        <h2>商品列表</h2>
        <van-list class="cart-list">
          <CartGood
            v-for="(good, index) in cartOrder.orderCommodities"
            :key="good.book_id"
            :title="good.title"
            :cover_url="good.cover_url"
            :price="good.price"
            :number="good.number"
            :index="index"
            class="order-good-item van-hairline--bottom"
            :changable="false"
            :shadow="false"
          />
        </van-list>
      </div>

      <div class="cell-card">
        <h2>
          <span>商品金额</span>
          <span style="float: right">￥{{totalPrice/100}}</span>
        </h2>
      </div>

      <div class="cell-card">
        <h2>
          <span>支付方式</span>
          <span style="float: right">在线支付</span>
        </h2>
      </div>

      <van-submit-bar
        :price="totalPrice"
        button-text="确认支付"
        class="submit-bar van-hairline--top"
        @submit="showDialog = true"
        v-if="!(cartOrder.status === 2)"
      />
      <!-- 不使用 !== 2 防止开始时默认显示而产生闪烁 -->
      <van-popup
        v-model="showDialog"
        position="bottom"
        :close-on-click-overlay="false"
        class="pay-dialog"
        :lazy-render="true"
      >
        <h2 class="title van-hairline--bottom">输入支付密码
          <van-icon name="arrow-left" @click="resetPopup" class="cancel-pay"/>
        </h2>
        <div class="container">
          <div v-if="payLoading" class="loading">
            <van-loading/>
          </div>
          <div v-else>
            <van-password-input :value="value" @focus="showKeyboard = true;"/>
            <router-link to="/user/pay_pwd_change" tag="div" class="forget-pwd">忘记密码?</router-link>
            <van-number-keyboard :show="true" @input="onInput" @delete="onDelete" class="keyboard"/>
          </div>
        </div>
      </van-popup>
    </div>
  </CommonNavbarLayout>
</template>

<script>
import { mapGetters, mapActions, dispatch } from "vuex";
export default {
  name: "order-confirm-page",
  data() {
    return {
      showDialog: false,
      value: "",
      payLoading: false
    };
  },
  computed: {
    ...mapGetters(["cartOrder", "user"]),
    totalPrice() {
      return Number(
        Number(
          this.cartOrder.orderCommodities.reduce(
            (acc, cur) => acc + cur.number * cur.price,
            0
          ) * 100
        ).toFixed(2)
      );
    }
  },
  methods: {
    ...mapActions(["getOrder", "getCartGoods", "updateDeposit"]),
    async orderSubmit() {
      this.payLoading = true;
      Promise.all([
        await this.$api.order.payOrder({
          orderID: this.cartOrder.orderID,
          payment: this.value
        }),
        await this.getCartGoods(),
        await this.updateDeposit(),
      ]).then(() => {
        this.payLoading = false;
        this.$dialog.alert({ message: "支付成功 " });
        this.$router.replace("/user/order/finish_list");
      });
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    resetPopup() {
      this.showDialog = false;
      this.value = "";
      this.payLoading = false;
    },
    async fetchOrder() {
      try {
        await this.getOrder(this.$route.query.order_id);
      } catch (e) {
        this.$toast(e.message);
        this.$router.replace("/");
      }
    }
  },
  watch: {
    value(value) {
      if (value.length === 6) {
        setTimeout(() => {
          this.orderSubmit();
        }, 300);
      }
    }
  },
  created() {
    this.fetchOrder();
  }
};
</script>

<style lang="scss">
.order-confirm-page {
  padding: 15px;
  background-color: #f8f8f8;
  min-height: calc(100vh - 50px);
  .cell-card {
    h2 {
      font-weight: 400;
      color: #333;
      font-size: 12px;
      padding: 0 10px;
    }
    border-radius: 3px;
    padding: 10px;
    background-color: #fff;
    box-shadow: 1px 1px 6px #eee;
    margin-bottom: 20px;
  }
  .pay-dialog {
    .cancel-pay {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .container {
      min-height: 345px;
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .title,
    .forget-pwd {
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      margin-bottom: 20px;
    }
    .title {
      height: 45px;
      line-height: 45px;
      position: relative;
    }
    .forget-pwd {
      margin: 10px 0 0;
      font-size: 14px;
      color: #1f68ee65;
    }
    .keyboard {
      margin-top: 50px;
      position: initial;
    }
  }
}
</style>
