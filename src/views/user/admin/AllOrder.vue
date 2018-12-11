<template>
  <div class="all-order">
    <commonNavbarLayout title="查看订单">
      <div class="container">
        <van-tabs
          v-model="active"
          @click="queryOrders"
        >
          <van-tab
            v-for="(item, index) in tabs"
            :title="item"
            :key="index"
          >
            <div class="order-list">
              <OrderItem
                v-for="order in orders"
                :key="order.orderID"
                :goods="order.orderCommodities"
                :status="order.status"
                :id="order.orderID"
                :isLink="false"
                :isAdmin="true"
                @statusChange="handleStatusChange"
              />
              <div
                class="empty-order-wrapper"
                v-if="orders.length === 0"
              >
                暂无该类订单
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </commonNavBarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

export default {
  name: "add-order-page",
  data() {
    return {
      active: 0,
      tabs: ["全部订单", "待付款订单", "已完成订单"],
      orders: []
    };
  },
  methods: {
    getAllOrders(status) {
      this.$api.admin
        .getAllOrders(status)
        .then(res => {
          this.orders = res.data.data.orders;
        })
        .catch(err => {
          console.log(err);
          this.$toast("订单信息加载失败，请刷新！");
        });
    },
    queryOrders(index, title) {
      if (index === 0) {
        this.getAllOrders();
      } else {
        this.getAllOrders(index);
      }
    },
    handleStatusChange(status, id) {
      this.orders.find(({orderID}) => orderID === id).status = status;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD hh:mm:ss");
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if (isEmpty(this.user)) {
      this.$router.replace("/login");
    } else if (this.user.role !== "admin") {
      this.$router.replace("/user");
    } else {
      this.getAllOrders();
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  .order-list {
    background: #f7f7f7;
    .empty-order-wrapper {
      font-size: 14px;
      margin-top: 10px;
      font-weight: 400;
      color: #ccc;
      text-align: center;
      background: #fff;
    }
  }
}
</style>