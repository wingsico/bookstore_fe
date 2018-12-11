<template>
  <div class="all-order">
    <commonNavbarLayout title="查看订单">
      <div class="container">
        <van-tabs v-model="active" @click="queryOrders">
          <van-tab v-for="(item, index) in tabs" :title=item :key=index>
            <div class="order" v-for="(item, index) in orders" :key=index>
              <van-row class="orderInfo">
                <van-row class="firstRow">
                  <van-col span="18">订单时间：{{formatDate(item.date)}}</van-col>
                  <van-col span="6">订单号：{{item.orderID}}</van-col>
                </van-row>
                <van-row class="secondRow">
                  <van-col span="18">用户名：{{item.username}}</van-col>
                  <van-col span="6">用户ID：{{item.userID}}</van-col>
                </van-row>
                <van-row class="thirdRow">
                  <van-col class="orderImage" span="6">
                    <img :src="item.orderCommodities[0].cover_url">
                  </van-col>
                  <van-col class="orderContent" span="18">
                    {{item.orderCommodities[0].title}}等  
                  </van-col>
                </van-row>
              </van-row>
              <van-row class="modifyStatus" type="flex" justify="space-between" align="center">
                <van-col>
                  订单状态：
                  <span v-if="item.status === 1">待付款</span>
                  <span v-else>已完成</span>
                </van-col>
                <van-col>
                  <van-button type="danger" size="small" @click="statusChange(index)">修改状态</van-button>
                </van-col>
              </van-row>
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
      orders: [],
    };
  },
  methods: {
    getAllOrders(status) {
      this.$api.admin
        .getAllOrders(status)
        .then(res => {
          this.orders = res.data.data.orders;
          console.log(this.orders);
        })
        .catch(err => {
          console.log(err);
          this.$toast("订单信息加载失败，请刷新！");
        });
    },
    queryOrders(index, title) {
      if(index === 0) {
        this.getAllOrders();
      } else {
        this.getAllOrders(index);
      }
    },
    statusChange(index) {
      this.falseOrders[index].status = 2;
    },
    formatDate(date) {
        return moment(date).format('YYYY-MM-DD hh:mm:ss');
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
  .order {
    background-color: #EBEEF5;
    font-size: 14px;
    padding: 0 7px;
    margin: 10px 3px 0;
    border-radius: 5px;
    .orderInfo {
      border-bottom: 1px solid #FFF;
      .firstRow {
        padding: 5px 0;
        border-bottom: 1px solid #FFF;
      }
      .secondRow {
        padding: 5px 0;
      }
      .thirdRow {
        padding: 7px 0;
        .orderImage {
          img {
            height: 70px;
          }
        }
        .orderContent {
          height: 70px;
          display: flex;
          align-items: center;
        }
      }
    }
    .modifyStatus {
      padding: 5px;
      font-size: 16px;
      font-family: 黑体;
      color: #409EFF;
    }
  }
}
</style>