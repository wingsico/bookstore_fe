<template>
  <div class="login-form">
    <van-cell-group>
      <van-field
        v-model="username"
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { Field, CellGroup } from 'vant';

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
  },
}
</script>

<style lang="sass" scoped>

</style>
