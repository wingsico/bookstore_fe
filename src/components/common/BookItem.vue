<template>
  <div class="book-item">
    <div class="item-inner">
      <div class="cover-wrapper">
        <img :src="cover" :alt="title">
      </div>
      <div class="content-wrapper">
        <h3 class="title van-ellipsis">{{title}}</h3>
        <p class="author">作者：{{ author }}</p>
        <p class="price">
          <!-- 不要换行 -->
          ￥<span class="int">{{intPart}}</span>.<span class="flot">{{floatPart}}</span>
        </p>
        <p class="extra">
          <van-tag type="danger">{{ type }}</van-tag>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "book-item",
  props: {
    cover: String,
    title: String,
    author: String,
    price: Number,
    type: String
  },
  computed: {
    intPart() {
      return String(this.price).split(".")[0]
    },
    floatPart() {
      return String(this.price).split(".")[1] || "00"
    }
  }
};
</script>
<style lang="scss" scoped>
.book-item {
  background-color: #fff;
  padding: 3px 5px;
  margin-bottom: 10px;
  position: relative;
  .item-inner {
    position: relative;
    padding-left: 120px;
    .cover-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 120px;
      height: 120px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .content-wrapper {
      min-height: 120px;
      padding: 8px 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        font-size: 14px;
        word-break: break-all;
        font-weight: 400;
        color: #333;
        line-height: 1.36;
      }

      .author {
        color: #999;
        font-size: 12px;
        margin-top: 6px;
      }

      .price {
        margin-top: 13px;
        display: inline-block;
        color: #e93b3d;
        min-width: 40px;
        font-size: 14px;
        .int {
          font-weight: 500;
          font-size: 18px;
        }
      }
    }
  }
}
</style>
