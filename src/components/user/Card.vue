<template>
  <div class="user-card">
    <div class="user-avatar">
      <span>{{ avatarChar }}</span>
    </div>
    <div class="user-info van-hairline--bottom">
      <div class="info-block bold">
        <span class="label">用户名：</span>
        <span class="content">{{ user.username}}</span>
      </div>
      <div class="info-block">
        <span class="label">昵称：</span>
        <span class="content">{{ user.nickname }}</span>
      </div>
      <div class="info-block">
        <span class="label">余额：</span>
        <span class="content">￥{{ user.deposit}}</span>
      </div>
    </div>

    <span class="user-id tag-wrapper">
      <van-tag color="#f2826a" plain>ID: {{user.id}}</van-tag>
    </span>

    <span class="user-role tag-wrapper">
      <van-tag :type="tagType">{{ user.role }}</van-tag>
    </span>
  </div>
</template>

<script>
export default {
  name: "user-card",
  props: {
    user: Object
  },
  computed: {
    avatarChar() {
      return this.user.nickname && this.user.nickname.slice(0, 1);
    },
    tagType() {
      return this.user.role === 'admin' ? 'danger' : 'primary'
    }
  }
};
</script>
<style lang="scss" scoped>
.user-card {
  display: flex;
  height: 90px;
  align-items: center;
  position: relative;
  .tag-wrapper {
    position: absolute;
    right: 10px;
  }
  .user-id {
    top: 5px;
  }
  .user-role {
    bottom: 12px;
  }
  .user-avatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: pink;
    color: #fff;
  }

  .user-info {
    margin-left: 10px;
    font-size: 14px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    .info-block {
      line-height: 1.6;
      &.bold {
        font-weight: 700;
      }
      .label {
        color: rgba(0, 0, 0, 0.7);
      }
    }
  }
}
</style>
