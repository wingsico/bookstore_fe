<template>
  <div class="recommend-list">
    <CommonDivider type="horizontal" class="line"/>
    <h3 class="title">猜 你 喜 欢</h3>
    <div class="container">
      <van-list :loading="loading">
        <CommonBookItem
          v-for="book in recommends"
          :key="book.id"
          :title="book.title"
          :price="book.price"
          :author="book.author"
          :type="book.classification"
          :cover_url="book.cover_url"
          :id="book.id"
          :border="border"
        />
      </van-list>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "recommend-list",
  data() {
    return{
      loading: false,
    }
  },
  props: {
    border: {
      type: Boolean,
      default: true,
    }
  },
  computed: {
    ...mapGetters(["recommends"])
  },
  methods: {
    ...mapActions(["getRecommends", "clearRecommends"]),
    async fetchRecommends() {
      this.loading = true;
      try {
        await this.getRecommends();
      } catch(e) {
        throw e;
      } finally {
        this.loading = false;
      }
    }
  },
  created() {
    if (this.recommends.length === 0) {
      this.fetchRecommends();
    }
  },
};
</script>

<style lang="scss" scoped>
.recommend-list {
  position: relative;
  background: #fff;
  padding: 20px 10px 0;
  .line {
    margin-top: 0;
  }
  .title {
    margin: 0;
    position: absolute;
    top: 9px;
    left: 50%;
    z-index: 4;
    transform: translateX(-50%);
    font-weight: 400;
    font-size: 12px;
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
