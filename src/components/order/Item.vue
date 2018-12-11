<template>
  <div class="order-item" @click="redirectHandler">
    <div class="order-box">
      <div class="order-id van-hairline--bottom">
        <div class="id-number">
          <span class="label">订单号：</span>
          <span class="content">{{ id }}</span>
        </div>
        <div class="admin-change" v-if="isAdmin">
          <van-button type="danger" size="small" @click="statusChange">修改订单状态</van-button>
        </div>
      </div>
      <div class="order-info van-hairline--bottom">
        <div class="order-status">
          <span class="label">状态：</span>
          <span :class="['content', statusClass]">{{ statusText }}</span>
        </div>
        <div class="order-user">
          <span class="label">用户名：</span>
          <span class="content">{{ username }}</span>
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
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  name: "order-item",
  props: {
    id: Number,
    status: Number,
    goods: Array,
    username: String,
    isLink: {
      type: Boolean,
      default: true
    },
    isAdmin: {
        type: Boolean,
        default: true
    }
  },
  methods: {
    redirectHandler() {
      if (this.isLink) {
        this.$router.push(this.redirectUrl);
      }
    },
    async statusChange() {
      let newStatus = this.status === 1 ? 2 : 1;
      try {
        await this.$api.admin.updateStatus(this.id, newStatus);
        this.$emit('statusChange', newStatus, this.id)
      } catch(e) {
        throw e;
      }
    }
  },
  computed: {
    ...mapGetters(["classifications"]),
    statusText() {
      const map = ["待付款", "已完成"];
      return map[this.status - 1];
    },
    statusClass() {
      const map = ["status-pay", "status-finish"];
      return map[this.status - 1];
    },
    price() {
      return Number(
        Number(
          this.goods.reduce((acc, cur) => acc + cur.price * cur.number, 0)
        ).toFixed(2)
      );
    },
    redirectUrl() {
      return `/cart/order?order_id=${this.id}`;
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
      justify-content: space-between;
      font-size: 14px;
      line-height: 44px;
      color: #999;
      position: relative;
      .admin-change {
        margin-right: 15px;
      }
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
