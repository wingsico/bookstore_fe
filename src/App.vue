<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<style lang="scss">
*,
*::before,
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

[class*="van-hairline"]::after {
  border-color: #ddd !important;
}

.van-nav-bar__title {
  font-weight: 400 !important;
}
</style>
