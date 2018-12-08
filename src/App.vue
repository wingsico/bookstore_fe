<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  methods: {
    ...mapActions(['getClassifications'])
  },
  created() {
    this.getClassifications();
  }
}
</script>


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

[class*="van-hairline"]:not([class*="van-tag"])::after {
  border-color: #ddd !important;
}

.van-nav-bar__title {
  font-weight: 400 !important;
}

</style>
