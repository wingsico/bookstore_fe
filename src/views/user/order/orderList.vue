<template>
  <div class="order-list">
    <OrderItem
      v-for="order in orderListByStatus"
      :key="order.orderID"
      :goods="order.orderCommodities"
      :status="order.status"
      :id="order.orderID"
    />
    <div class="empty-order-wrapper" v-if="orderListByStatus.length === 0">
      暂无该类订单
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "order-list",
  data() {
    return {

    };
  },
  computed: {
    ...mapGetters(["orderList"]),
    orderListByStatus() {
      const {status} = this.$route.meta;
      if (status === 0) {
        return this.orderList;
      } else {
        return this.orderList.filter(order => order.status === status).sort((a,b) => new Date(a.date) > new Date(b.date));
      }
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
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
</style>
