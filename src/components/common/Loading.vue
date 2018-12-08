<template>
  <div class="loading-page">
    <van-loading size="50px" />
  </div>
</template>

<style lang="scss" scoped>
  .loading-page {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fafafa;
    z-index: 100;
  }
</style>
