<template>
  <div class="navbar-layout">
    <van-nav-bar @click-left="handleBackClick">
      <div class="title" slot="title">{{ title }}</div>
      <van-icon name="arrow-left" slot="left" color="#333"/>
    </van-nav-bar>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'navbar-layout',
  props: {
    title: {
      type: String,
      required: true,
    },
    backUrl: String,
  },
  methods: {
    handleBackClick() {
      this.backUrl ? this.$router.replace(this.backUrl) : this.$router.go(-1);
    }
  }
}
</script>
