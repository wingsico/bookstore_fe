<template>
  <div class="cell-item" @click="routerGo">
    <van-icon :name="name" :size="size" :color="color" />
    <span class="text">{{ text }}</span>
  </div>
</template>
<script>
export default {
  name: 'cell-item',
  props: {
    to: String,
    name: String,
    size: String,
    color: String,
    text: String,
  },
  methods: {
    routerGo() {
      this.to ? this.$router.push(this.to) : this.$emit('click')
    }
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
