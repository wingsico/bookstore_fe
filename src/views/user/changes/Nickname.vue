<template>
  <div class="change-nickname">
    <CommonNavbarLayout title="修改昵称">
      <van-cell-group :border="false">
        <div class="new-nickname-wrapper">
          <label>
            <h2 class="tip">输入新昵称</h2>
            <van-field
              v-model="nickname"
              clearable
              type="text"
              placeholder="请输入要设置的新昵称"
              border
              icon="contact"
              class="nickname-input van-hairline--bottom van-hairline--top"
              autofocus
            />
          </label>
        </div>
      </van-cell-group>
      <div class="btn-wrapper">
        <van-button
          round
          type="primary"
          size="large"
          class="btn"
          @click="onClick"
          :disabled="!changabled"
        >确认修改</van-button>
      </div>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "change-nickname",
  data() {
    return {
      nickname: ""
    };
  },
  methods: {
    ...mapActions(["updateNickname"]),
    async onClick() {
      await this.updateNickname(this.nickname);
      this.$router.go(-1);
    }
  },
  computed: {
    changabled() {
      return this.nickname.trim().length !== 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.change-nickname {
  h2.tip {
    font-weight: 400;
    color: #999;
    font-size: 14px;
    margin: 15px;
  }
  .btn-wrapper {
    margin: 20px 15px;
  }
}
</style>
