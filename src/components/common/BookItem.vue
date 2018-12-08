<template>
<!-- <lazy-component> -->
  <router-link class="book-item" tag="div" :to="bookUrl">
    <div class="item-inner">
      <div class="cover_url-wrapper">
        <div class="img" :alt="title" v-lazy:background-image="cover_url" />
      </div>
      <div :class="{'content-wrapper': true, 'van-hairline--bottom': border}" >
        <h3 class="title van-ellipsis">{{title}}</h3>
        <p class="author">{{ author }}</p>
        <p class="price">
          <!-- 不要换行 -->
          ￥<span class="int">{{intPart}}</span>.<span class="flot">{{floatPart}}</span>
        </p>
        <p class="extra">
          <van-tag type="danger">{{ classification }}</van-tag>
        </p>
      </div>
    </div>
  </router-link>
<!-- </lazy-component> -->
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "book-item",
  props: {
    cover_url: String,
    title: String,
    author: String,
    price: Number,
    type: Number,
    id: [String, Number],
    border: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapGetters(['classifications']),
    intPart() {
      return String(this.price).split(".")[0]
    },
    floatPart() {
      return String(this.price).split(".")[1] || "00"
    },
    bookUrl() {
      return `/book/detail/${this.id}`;
    },
    classification() {
      return this.classifications.filter(classification => classification.id === this.type)[0].name;
    },
  }
};
</script>
<style lang="scss" scoped>
.book-item {
  background-color: #fff;
  margin-bottom: 10px;
  position: relative;
  .item-inner {
    position: relative;
    padding-left: 110px;
    .cover_url-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      overflow: hidden;
      padding: 10px;
      .img {
        width: 100px;
        height: 100px;
        transition: all .3s;
        background-repeat: no-repeat;
        background-size: cover;
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
