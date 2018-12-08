<template>
  <div class="home-page">
    <van-swipe :autoplay="3000" class="swipe-wrapper">
      <van-swipe-item v-for="(url, index) in swipeUrls" :key="index" class="swipe-item">
        <img :src="url">
      </van-swipe-item>
    </van-swipe>
    <div class="title-wrapper">
      <CommonDivider type="horizontal" class="line"/>
      <h2 class="title">木迹推荐</h2>
    </div>
    <van-tabs v-model="active" sticky swipeable @click="onTabChange">
      <van-tab
        v-for="classification in classifications"
        :key="classification.id"
        :title="classification.name"
      >
        <HomeBookTypeList :classification="classification.id" class="book-list" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "home-page",
  data() {
    return {
      swipeUrls: [
        "http://img62.ddimg.cn/2018/11/27/201811271727186780.jpg",
        "http://img62.ddimg.cn/2018/11/27/201811271726268191.jpg",
        "http://img63.ddimg.cn/2018/11/27/2018112717265184580.jpg",
        "http://img60.ddimg.cn/upload_img/00316/by/750x315_wzh_20181121-1542792577.jpg",
        "http://img61.ddimg.cn/upload_img/00570/tongshu/750x315_djj_1101-1541138681.jpg"
      ],
      active: 0,
    };
  },
  methods: {
    onTabChange(index, title) {

    },
  },
  computed: {
    ...mapGetters(['classifications'])
  },
};
</script>
<style lang="scss" scoped>
.home-page {
  background-color: #f7f7f7;
  min-height: calc(100vh - 50px);
  .book-list {
    margin-bottom: 20px;
  }
  .swipe-wrapper {
    .swipe-item {
      font-size: 0;
      img {
        width: 100%;
        height: 170px;
      }
    }
  }
  .title-wrapper {
    position: relative;
    background: #f7f7f7;
    padding: 0 10px;
  }
  .title {
    margin: 0;
    position: absolute;
    top: -12px;
    left: 50%;
    z-index: 7;
    transform: translateX(-50%);
    font-weight: 400;
    font-size: 14px;
    color: #ccc;
    background: inherit;
    padding: 5px 15px;
    text-align: center;
    &::after,
    &::before {
      content: "";
      position: absolute;
      top: 50%;
      margin-top: -1.5px;
      width: 4px;
      height: 4px;
      background-color: #ccc;
      -webkit-transform: rotate(45deg);
      transform: rotate(45deg);
    }
    &::after {
      right: 0;
    }
    &::before {
      left: 0;
    }
  }
}
</style>
