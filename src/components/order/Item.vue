<template>
  <router-link class="order-item" tag="div" :to="redirectUrl">
    <div class="order-box">
      <div class="order-id van-hairline--bottom">
        <span class="label">订单号：</span>
        <span class="content">{{ id }}</span>
      </div>
      <div class="order-info van-hairline--bottom">
        <div class="order-status">
          <span class="label">状态：</span>
          <span :class="['content', statusClass]">{{ statusText }}</span>
        </div>
        <div class="order-price">
          <span class="label">总价：</span>
          <span class="content">￥{{ price }}</span>
        </div>
      </div>
      <div class="order-goods">
        <p class="shop-name">
          <van-icon name="shop" class="icon"/>
          <span class="title">木迹官方</span>
        </p>
        <div class="container">
          <van-card
            v-for="good in goods"
            :key="good.bookID"
            :num="good.number"
            :title="good.title"
            :thumb="good.cover_url"
            :desc="good.info"
            :price="good.price"
            :tag="classifications[good.classification - 1].name"
          />
        </div>
      </div>
    </div>
  </router-link>
</template>
<script>
import {mapGetters} from 'vuex';
export default {
  name: "order-item",
  props: {
    id: Number,
    status: Number,
    goods: Array
  },
  computed: {
    ...mapGetters(['classifications']),
    statusText() {
      const map = ["待付款", "已完成"];
      return map[this.status - 1];
    },
    statusClass() {
      const map = ["status-pay", "status-finish"];
      return map[this.status - 1];
    },
    price() {
      return Number(Number(this.goods.reduce((acc, cur) => acc + cur.price * cur.number,0)).toFixed(2));
    },
    redirectUrl() {
      return `/cart/order?order_id=${this.id}`
    }
  }
};
</script>

<style lang="scss" scoped>
.order-item {
  .order-box {
    padding: 0 0 5px 10px;
    position: relative;
    transition: 0.5s ease-in-out;
    margin-bottom: 15px;
    background: #fff;
    .order-id {
      height: 44px;
      display: flex;
      font-size: 14px;
      line-height: 44px;
      color: #999;
      position: relative;
    }

    .label {
      color: #999;
    }

    .content {
      color: #333;
    }

    .order-goods {
      padding-right: 10px;
      .shop-name {
        display: block;
        position: relative;
        padding: 11px 10px 7px 20px;
        height: 24px;
        font-size: 16px;
        line-height: 24px;
        box-sizing: content-box;
        color: #666;
        .icon {
          position: absolute;
          left: 0;
          top: 15px;
        }
      }
    }

    .order-info {
      min-height: 42px;
      padding: 12px 0;
      position: relative;
      & > div {
        line-height: 1.5em;
        font-size: 14px;
        color: #999;
      }

      .order-status {
        .status-pay {
          color: #ff6600;
        }

        .status-finish {
          color: #e93b3d;
        }

        .status-get {
          color: #3eaf7c;
        }
      }
    }
  }
}
</style>
