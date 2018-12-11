<template>
  <div class="user-setting-page">
   <CommonNavbarLayout title="账号管理">

    <div class="container">
      <p class="user-title">当前登录用户</p>
      <van-cell-group class="cell-group">
        <van-cell>
          <div class="user-info">
            <div class="user-avatar">{{ AvatarChar }}</div>
            <div class="user-profile">
              <p class="user-id">
                <span class="label">mj_{{ user.id }}</span>
              </p>
              <p class="nickname">
                <span class="label">用户名：</span>
                {{ user.username }}
              </p>
            </div>
          </div>
        </van-cell>
        <van-cell title="修改支付密码" is-link to="/user/pay_pwd_change"/>
        <van-cell title="修改昵称" is-link to="/user/nickname_change" :value="user.nickname"/>
      </van-cell-group>
      <footer>
        <van-button round type="danger" size="large" @click="handleLogout">退出登录</van-button>
      </footer>
    </div>
   </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "user-setting-page",
  computed: {
    ...mapGetters(["user"]),
    AvatarChar() {
      return this.user.nickname && this.user.nickname.slice(0, 1);
    }
  },
  methods: {
    ...mapActions(["logout"]),
    handleBackClick() {
      this.$router.go(-1);
    },
    handleLogout() {
      this.$dialog.confirm({
        title: "退出",
        message: "确认退出当前账号吗？"
      }).then(() => {
        this.logout(this.$router);
      })
    }
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
  font-weight: 400;
  .user-title {
    font-size: 14px;
    font-weight: 400;
    margin: 0 10px;
    padding: 12px 0;
    position: relative;
  }
  .cell-group {
    .van-cell {
      color: #999;
    }
  }

  .user-info {
    padding: 5px;
    display: flex;
    align-items: center;
  }
  .user-profile {
    color: #999;
    margin-left: 10px;
    font-size: 12px;
    overflow: hidden;
    .user-id {
      color: #333;
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

  footer {
    margin-top: 20px;
  }
}
</style>
