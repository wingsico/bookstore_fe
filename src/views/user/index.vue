<template>
  <div class="user-page">
    <router-view v-if="showRouterView" style="z-index: 200"></router-view>
    <CommonNavbarLayout title="我的木迹" v-else>
      <div class="container">
        <div class="user-wrapper">
          <div class="user-card shadow">
            <div class="user-avatar">{{ AvatarChar }}</div>
            <div class="user-info">
              <p class="nickname">{{ user.nickname }}</p>
              <p class="username">用户名: {{ user.username }}</p>
              <p class="deposit">
                <van-icon name="gold-coin" class="icon"/>
                <span>{{user.deposit}}</span>
              </p>
            </div>
            <router-link class="user-account" tag="div" to="/user/setting">
              <div class="account-wrapper">
                <van-icon name="setting"/>
                <span>账号设置</span>
              </div>
            </router-link>
          </div>
        </div>
        <div class="cell-group">
          <van-row class="row" type="flex">
            <van-col span="8" class="col">
              <UserCellItem name="debit-pay" color="gold" text="待付款" to="/user/order/pay_list"/>
            </van-col>
            <van-col span="8" class="col">
              <UserCellItem name="cash-on-deliver" color="gold" text="待收货" @click="handleNoService" />
            </van-col>
            <van-col span="8" class="col">
              <UserCellItem name="goods-collect" color="gold" text="已完成" to="/user/order/finish_list"/>
            </van-col>
            <van-col span="8" class="last col">
              <UserCellItem name="description" color="red" text="全部订单" to="/user/order/all_list"/>
            </van-col>
          </van-row>
        </div>
        <div class="recommends-wrapper">
        <CommonRecommendList />

        </div>
      </div>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "user-page",
  computed: {
    ...mapGetters(["user"]),
    AvatarChar() {
      return this.user.nickname && this.user.nickname.slice(0, 1);
    },
    showRouterView() {
      return this.$route.fullPath !== '/user'
    }
  },
  methods: {
    handleBackClick() {
      this.$router.go(-1);
    },
    handleNoService(e) {
      this.$toast('暂无此服务')
    }
  },
  created() {
    if (isEmpty(this.user)) {
      this.$router.replace('/login');
    }
  }
};
</script>

<style lang="scss" scoped>
.user-page {
  .container {
    background-color: #f7f7f7;
    .recommends-wrapper {
      padding: 0 10px 10px;
      background-color: #fff;
    }
    .cell-group {
      height: 72px;
      background: #fff;
      margin: 15px 0;
      .row {
        height: 100%;
        .col {
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        .last {
          position: relative;
          &::before {
            background: url(https://img11.360buyimg.com/jdphoto/s20x144_jfs/t14743/330/1610539369/321/10d659d3/5a53580eNa26a8177.png)
              0 0/10px;
            content: "";
            height: 72px;
            left: -5px;
            position: absolute;
            top: 0;
            width: 10px;
            z-index: 1;
          }
        }
      }
    }
    .user-wrapper {
      padding: 10px;
      background: #fff;
      .user-card {
        background: linear-gradient(90deg, #eb3c3c, #ff7459);
        border-radius: 6px;
        height: 120px;
        overflow: hidden;
        position: relative;
        width: 100%;
        display: flex;
        padding: 20px;
        align-items: center;
        &.shadow {
          box-shadow: 0 2px 4px rgba(228, 57, 60, 0.4);
        }
        .user-account {
          position: absolute;
          right: 15px;
          top: 0;
          height: 40px;
          line-height: 40px;
          overflow: hidden;
          .account-wrapper {
            position: relative;
            color: rgba(76, 0, 0, 0.7);
            font-size: 12px;
            height: 100%;
            padding-left: 15px;
            display: flex;
            align-items: center;
            span {
              margin-left: 5px;
            }
          }
        }
        .user-avatar {
          width: 60px;
          height: 60px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          background: pink;
          color: #fff;
          border: 1px solid hsla(0, 0%, 100%, 0.4);
          border-radius: 60px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
          overflow: hidden;
          font-size: 40px;
        }
        .user-info {
          flex: 1;
          margin-left: 20px;
          .nickname {
            color: #fff;
            font-size: 14px;
          }

          .username {
            color: hsla(0, 0%, 100%, 0.7);
            display: block;
            font-size: 12px;
            margin-top: 4px;
          }

          .deposit {
            background: #c8483f;
            border-radius: 10px;
            color: #fff;
            display: inline-block;
            font-size: 10px;
            // height: 15px;
            // line-height: 16px;
            margin-right: 5px;
            margin-top: 4px;
            padding: 4px 8px;
            text-align: center;
            .icon {
              vertical-align: middle;
            }
            span {
              vertical-align: middle;
              margin-left: 4px;
            }
          }
        }
      }
    }
  }
}
</style>
