<template>
  <div class="login-form">
    <cell-group>
      <field
        v-model="username"
        clearable
        label="用户名"
        icon="question"
        placeholder="请输入用户名"
      />

      <field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
      />
    </cell-group>
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
    Field,
    CellGroup,
  },
}
</script>

<style lang="sass" scoped>

</style>
