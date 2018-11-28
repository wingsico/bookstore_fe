<template>
  <div class="login-form">
    <van-cell-group
      class="form-group"
      :border="false"
    >
      <van-field
        v-model="username"
        clearable
        icon="question"
        placeholder="请输入用户名"
        border
        class="username-input input"
      />

      <van-field
        v-model="password"
        type="password"
        placeholder="请输入密码"
        class="password-input input"
      />

      <van-cell-group class="button-group" :border="false">
        <van-button
          type="danger"
          round
          size="large"
          class="button login-button"
          :disabled="loginButtonDisabled"
        >
          登&nbsp;&nbsp;录
        </van-button>
        <van-button
          type="danger"
          round
          plain
          size="large"
          class="button"
        >
          一键注册
        </van-button>
      </van-cell-group>

    </van-cell-group>
  </div>
</template>

<script>
import { Field, CellGroup, Button } from 'vant';

export default {
  name: 'login-form',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  components: {
    [Field.name]: Field,
    [CellGroup.name]: CellGroup,
    [Button.name]: Button,
  },
  computed: {
    loginButtonDisabled() {
      return !(this.username && this.password);
    },
  }
}
</script>

<style lang="scss" scoped>

.login-form {
  padding: 25px;

  .input {
    border-bottom: .01rem solid #efefef;
    margin-top: 20px;
    padding-left: 0;
    font-size: 16px;
    color: #222;
  }

  .button-group {
    margin-top: 20px;

    .button:last-child {
      margin-top: 10px;
    }
  }
}



</style>
