<template>
  <div class="register-page">
    <CommonNavbarLayout title="注册木迹" :showRight="false">
      <div class="form">
        <van-cell-group class="form-group" :border="false">
          <van-field v-model="username" placeholder="取个好记的用户名吧~" class="username-input input"/>
          <van-field v-model="nickname" placeholder="取个好听的昵称吧~" class="username-input input"/>
          <van-field
            v-model="password"
            type="password"
            placeholder="用户密码"
            class="password-input input"
          />

          <van-cell-group class="button-group" :border="false">
            <van-button type="primary" round plain size="large" class="button" @click="showPopup">注册</van-button>
          </van-cell-group>
        </van-cell-group>
      </div>

      <van-popup
        v-model="showDialog"
        position="bottom"
        :close-on-click-overlay="false"
        class="pay-dialog"
        :lazy-render="true"
      >
        <h2 class="title van-hairline--bottom">设置你的支付密码
          <van-icon name="arrow-left" @click="resetPopup" class="cancel-pay"/>
        </h2>
        <div class="container">
          <div v-if="payLoading" class="loading">
            <van-loading/>
          </div>
          <div v-else>
            <van-password-input :value="value" info="需要设置6位密码哦" :error-info="errorInfo"/>
            <van-number-keyboard :show="true" @input="onInput" @delete="onDelete" class="keyboard"/>
          </div>
        </div>
      </van-popup>
    </CommonNavbarLayout>
  </div>
</template>

<script>
// import { LoginForm, LoginFooter } from '@/components/login';
import { mapActions, mapGetters } from "vuex";

export default {
  name: "register-page",
  data() {
    return {
      username: "",
      nickname: "",
      password: "",
      showDialog: false,
      value: "",
      payLoading: false,
      errorInfo: ""
    };
  },
  methods: {
    ...mapActions(["login"]),
    async registerSubmit() {
      this.payLoading = true;
      const registerObj = {
        username: this.username,
        nickname: this.nickname,
        password: this.password,
        payment: this.value
      };
      try {
        const res = await this.$api.user.register(registerObj);
        // const {
        //   data: {
        //     data: {user}
        //   }
        // } = res;
        await this.login(registerObj);
        this.$toast("注册成功");
        this.payLoading = false;
        this.$router.push("/user");
      } catch (e) {
        this.$dialog.alert({
          title:'注册失败',
          message: e.message
        });
        this.resetPopup();
      }
    },
    showPopup() {
      const pass = this.checkout();
      if (!pass) {
        this.$toast("先完善注册信息哦~");
        return;
      }
      this.showDialog = true;
    },
    checkout() {
      return this.username && this.nickname && this.password;
    },
    onInput(key) {
      this.value = (this.value + key).slice(0, 6);
    },
    onDelete() {
      this.value = this.value.slice(0, this.value.length - 1);
    },
    resetPopup() {
      this.showDialog = false;
      this.value = "";
      this.payLoading = false;
    }
  },
  watch: {
    value(value) {
      if (value.length === 6) {
        this.$dialog
          .confirm({
            title: "确认",
            message: `你设置的支付密码为: ${this.value}`
          })
          .then(() => {
            this.registerSubmit();
          });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.register-page {
  .form {
    padding: 20px;
    .input {
      margin-bottom: 10px;
    }
    .button-group {
      margin-top: 30px;
    }
  }
  .pay-dialog {
    .cancel-pay {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }

    .container {
      min-height: 345px;
      .loading {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .title,
    .forget-pwd {
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      margin-bottom: 20px;
    }
    .title {
      height: 45px;
      line-height: 45px;
      position: relative;
    }
    .forget-pwd {
      margin: 10px 0 0;
      font-size: 14px;
      color: #1f68ee65;
    }
    .keyboard {
      margin-top: 50px;
      position: initial;
    }
  }
}
</style>
