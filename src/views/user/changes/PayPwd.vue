<template>
  <div class="change-pay-pwd">
    <CommonNavbarLayout title="修改支付密码">
      <h2 class="tip">输入要设置的新密码</h2>
      <van-password-input :value="value" info="密码为 6 位数字" @focus="showKeyboard = true"/>
      <div class="btn-wrapper">
        <van-button round type="primary" size="large" class="btn" @click="onClick" :disabled="!changabled">确认修改</van-button>
      </div>
      <!-- 数字键盘 -->
      <van-number-keyboard
        :show="showKeyboard"
        @input="onInput"
        @delete="onDelete"
        @blur="showKeyboard = false"
      />
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: "change-pay-pwd",
  data() {
    return {
      value: "",
      showKeyboard: true
    };
  },
  methods: {
    ...mapActions(['updatePayPwd']),
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    async onClick() {
      if (this.value.length < 6) {
        this.$toast('密码长度不正确!');
        return;
      }
      await this.updatePayPwd(this.value);
      this.$router.go(-1);
    }
  },
  computed: {
    changabled() {
      return this.value.length === 6;
    }
  }
};
</script>

<style lang="scss" scoped>
.change-pay-pwd {
  h2.tip {
    font-weight: 400;
    color: #999;
    font-size: 14px;
    margin: 20px 15px;
  }

  .btn-wrapper {
    margin: 20px 15px;
  }
}
</style>
