<template>
  <router-link class="cell-item" :to="to" tag="div">
    <van-icon :name="name" :size="size" :color="color" />
    <span class="text">{{ text }}</span>
  </router-link>
</template>
<script>
export default {
  name: 'cell-item',
  props: {
    to: {
      type: String,
      default: '/'
    },
    name: String,
    size: String,
    color: String,
    text: String,
  }
}
</script>
<style lang="scss" scoped>
  .cell-item {
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    .text {
      color: #666;
      font-size: 12px;
      margin-top: 6px;
    }
  }
</style>
