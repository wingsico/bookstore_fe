<template>
  <div class="all-user-info">
    <commonNavbarLayout title="用户信息">
      <div class="container">
        <van-search v-model="searchKey" placeholder="请输入用户名搜索用户信息"
                    show-action @search="onSearch" @clear="onClear">
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="users">
          <div class="user" v-for="item in users" :key="item.id">
            <van-row class="firstRow">
              <van-col :span="16">
                <van-row class="nickname">昵称：{{item.nickname}}</van-row>
                <van-row class="username">用户名：{{item.username}}</van-row>
              </van-col>
              <van-col :span="8">
                <van-row class="userID">用户ID：{{item.id}}</van-row>
              </van-col>
            </van-row>
            <van-row class="secondRow">
              <van-col :span="16" class="role">用户身份：{{roleText(item.role)}}</van-col>
              <van-col :span="8" class="money">余额：{{item.deposit}}￥</van-col>
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
      users: []
    };
  },
  methods: {
    getAllUsers() {
      this.$api.admin.getAllUsers()
      .then(res => {
        this.users = res.data.data.users;
      })
      .catch(err => {
        console.log(err)
      })
    },
    roleText(role) {
      return role === 'admin' ? '管理员' : '普通用户';
    },
    onSearch() {
      if(this.searchKey === '') {
        this.getAllUsers();
        return;
      }
      this.$api.admin.query(this.searchKey)
      .then(res => {
        this.users = [];
        this.users[0] = res.data.data.user;
      })
      .catch(err => {
        this.$toast("没有此用户名！");
        this.searchKey = '';
      })
    },
    onClear() {
      this.getAllUsers();
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if (isEmpty(this.user)) {
      this.$router.replace('/login');
    } else if (this.user.role !== "admin") {
        this.$router.replace('/user')
    } else {
        this.getAllUsers();
    }
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
          padding: 7px 0;
          .nickname {
            font-size: 18px;
            margin-bottom: 12px;
          }
          .userID {
            font-size: 15px;
          }
        }
        .secondRow {
          padding: 7px 0;
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