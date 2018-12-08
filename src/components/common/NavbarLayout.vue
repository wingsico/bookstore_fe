<template>
  <div class="navbar-layout">
    <van-nav-bar @click-left="handleBackClick" @click-right="onClickRight">
      <div class="title" slot="title">{{ title }}</div>
      <van-icon name="arrow-left" slot="left" color="#333"/>
      <van-icon name="wap-nav" slot="right" color="#333" v-if="showRight" />
    </van-nav-bar>
    <slot></slot>
    <van-popup v-model="show" position="right" get-container=".navbar-layout">
      <nav class="nav-menu">
        <van-cell-group>
          <van-cell
            v-for="navLink in navLinks"
            :key="navLink.name"
            is-link
            :to="navLink.link"
            :title="navLink.name"
            :icon="navLink.icon"
          />
        </van-cell-group>
      </nav>
    </van-popup>
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
    showRight: {
      type:Boolean,
      default: true
    }
  },
  data() {
    return {
      show: false,
      navLinks: [
        {
          name: '首页',
          link: '/',
          icon: 'wap-home'
        }, {
          name: '我的木迹',
          link: '/user',
          icon: 'contact',
        }
      ]
    }
  },
  methods: {
    handleBackClick() {
      this.backUrl ? this.$router.replace(this.backUrl) : this.$router.go(-1);
    },
    onClickRight() {
      this.show = true;
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-menu {
  // height: 100vh;
}
</style>
