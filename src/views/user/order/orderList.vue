<template>
  <div class="order-list">
    <OrderItem
      v-for="order in orderListByStatus"
      :key="order.orderID"
      :goods="order.commodities"
      :status="order.status"
      :id="order.orderID"
    />
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
        return this.orderList.filter(order => order.status === status);
      }
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.order-list {
  background: #f7f7f7;
}
</style>
