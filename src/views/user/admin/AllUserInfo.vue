<template>
  <div class="all-user-info">
    <commonNavbarLayout title="用户信息">
        <div class="container">
          <van-search v-model="searchKey" placeholder="请输入用户名"
                      show-action @search="onSearch" @cancel="onCancel">
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>
          <div class="users">
            <div class="user">
              <van-row class="firstRow">
                <van-col :span="16">
                  <van-row class="nickname">{{users[0].nickname}}</van-row>
                  <van-row class="username">用户名：{{users[0].username}}</van-row>
                </van-col>
                <van-col :span="8">
                  <van-row class="userID">用户ID：{{users[0].userID}}</van-row>
                </van-col>
              </van-row>
              <van-row class="secondRow">
                <van-col :span="16" class="role">用户身份：{{users[0].role}}</van-col>
                <van-col :span="8" class="money">余额：{{users[0].money}}￥</van-col>
              </van-row>
            </div>
          </div>
        </div>
    </commonNavBarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "all-user-info-page",
  data() {
    return {
      searchKey: '',
      users: [
        {
          username: 'admin01',
          nickname: '这是昵称',
          userID: 12,
          role: 'admin',
          money: 954
        }
      ]
    };
  },
  methods: {
    onSearch() {
      console.log(this.searchKey)
    },
    onCancel() {
      console.log(2)
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    // if (isEmpty(this.user)) {
    //   this.$router.replace('/login');
    // } else if (this.user.role !== "admin") {
    //     this.$router.replace('/user')
    // }
  }
};
</script>

<style lang="scss" scoped>
.all-user-info {
  .container {
    .users {
      .user {
        background-color: #EBEEF5;
        font-size: 14px;
        padding: 0 7px;
        margin: 10px 3px 0;
        border-radius: 5px;
        .firstRow {
          border-bottom: 1px solid #FFF;
          padding: 5px 0;
          .nickname {
            font-size: 18px;
            margin-bottom: 10px;
          }
          .userID {
            font-size: 18px;
          }
        }
        .secondRow {
          padding: 5px 0;
          .role {
            color: #409EFF;
          }
          .money {
            color: #F56C6C;
          }
        }
      }
    }
  }
}
</style>