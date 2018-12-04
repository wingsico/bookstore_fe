<template>
  <div class="login-form">
    <van-cell-group
      class="form-group"
      :border="false"
    >
      <van-field
        v-model="username"
        placeholder="请输入用户名"
        class="username-input input"
      />

      <van-field
        v-model="password"
        :type="passwordInputType"
        placeholder="请输入密码"
        class="password-input input"
      >
        <div slot="icon" class="password-right">
          <van-icon :name="passwordViewIconName" class="view-icon" @click="handlePasswordViewClick"/>
          <CommonDivider type="vertical" />
          <router-link to="/findpwd" class="text">忘记密码</router-link>
        </div>
      </van-field>

      <van-cell-group class="button-group" :border="false">
        <van-button
          type="danger"
          round
          size="large"
          class="button login-button"
          :disabled="loginButtonDisabled"
          @click="handleUserLogin"
          :loading="logining"
        >
          登 录
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
import { mapActions, mapGetters} from 'vuex';
import { encrypt } from '@/utils/utils';

export default {
  name: 'login-form',
  data() {
    return {
      username: '',
      password: '',
      logining: false,
      viewPassword: false,
    }
  },
  computed: {
    loginButtonDisabled() {
      return !(this.username && this.password);
    },
    passwordViewIconName() {
      return this.viewPassword ? 'password-view' : 'password-not-view';
    },
    passwordInputType() {
      return this.viewPassword ? 'text' : 'password';
    },
    ...mapGetters(['user']),
  },
  methods: {
    ...mapActions([ 'login' ]),
    async handleUserLogin() {
      const {username, password, $router} = this;
      await this.login({username,password})
      this.$toast('登录成功');
      this.$cookies.set("username", encrypt(username), '2h')
        .set("password", encrypt(password), '2h')
      $router.push('/user')
    },
    setLoginingStatus(status = false) {
      this.logining = status;
    },
    handlePasswordViewClick() {
      this.viewPassword = !this.viewPassword;
    }
  },
}
</script>

<style lang="scss" scoped>

.login-form {
  padding: 25px;
  .van-cell:not(:last-child)::after {
    left: 0;
    border-bottom-color: #ddd;
  }
  .input {
    // border-bottom: .01rem solid #efefef;
    font-size: 16px;
    color: #222;
    padding: 10px 5px 10px 0;
    font-weight: 400;
  }

  .username-input {
    padding-bottom: 14px;
  }

  .password-input {
    margin-top: 25px;
  }

  .button-group {
    margin-top: 30px;

    .button:last-child {
      margin-top: 10px;
    }

    .login-button {
      background: linear-gradient(90deg,#f10000,#ff2000 73%,#ff4f18);
    }

    .van-button--disabled {
      opacity: 1;
      background: linear-gradient(90deg,#fab3b3,#ffbcb3 73%,#ffcaba);
      border: none;
    }
  }

  .password-right {
    display: inline-flex;
    align-items: center;
      font-size: 14px;
    .view-icon {
      display: inline-block;

    }
    .text {
      color: #222;
      font-weight: 400;
    }
  }
}



</style>
