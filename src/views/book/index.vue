<template>
  <div class="book-detail">
    <CommonLoading v-if="loading"/>
    <CommonNavbarLayout title="商品详情" v-else>
      <div class="book-cover_url-wrapper van-hairline--bottom">
        <img :src="book.cover_url" :alt="book.title">
      </div>
      <div class="book-info-wrapper van-hairline--bottom">
        <div class="book-title-wrapper">
          <h2 class="book-title">
            <van-tag color="#F63515">{{ book.classification }}</van-tag>
            {{ book.title}}
          </h2>
        </div>
        <div class="publish">
          <p class="press">
            出版社:
            <span>{{ book.press }}</span>
          </p>
          <p class="author">
            作者:
            <span>{{ book.author }}</span>
          </p>
          <p class="date">
            出版日期:
            <span>{{ publishDate }}</span>
          </p>
        </div>
        <div class="price-wrapper">
          <span>￥</span>
          <span class="int">{{intPart}}</span>
          <span class="float">.{{ floatPart }}</span>
          <van-tag type="danger" plain>折扣</van-tag>
        </div>
      </div>
      <CommonGap/>
      <van-cell class="checked-book" clickable @click="displaySku" value="···">
        <div slot="title" class="checked-box">
          <span class="lable">已选</span>
          <span class="number">{{ number }} 本</span>
        </div>
      </van-cell>
      <CommonGap/>

      <van-panel title="作者简介" class="author-info-wrapper panel">
        <div class="content">{{ book.author_intro }}</div>
      </van-panel>
      <CommonGap/>

      <van-panel title="书籍简介" class="book-content-wrapper panel">
        <div class="content">{{ book.content }}</div>
      </van-panel>
      <CommonGap/>

      <van-goods-action style="z-index: 6">
        <van-goods-action-mini-btn icon="chat" text="客服" @click="$toast('暂无客服')"/>
        <van-goods-action-mini-btn icon="cart" text="购物车" :info="goodsCount" to="/cart"/>
        <van-goods-action-big-btn text="加入购物车" @click="addCartGood"/>
      </van-goods-action>

      <van-sku
        v-model="showBase"
        :sku="sku"
        :goods="goods"
        :goods-id="book.id"
        :hide-stock="sku.hide_stock"
      >
        <div slot="sku-stepper" class="sku-stepper">
          <div class="sku-info">
            <div class="buy-text">购买数量</div>
            <van-stepper
              v-model="number"
              integer
              :min="1"
              :max="quota"
              @overlimit="handleStepperOverLimit"
            />
          </div>
          <div class="quota-info">单次限购{{quota}}本书籍</div>
        </div>
        <div class="sku-actions" slot="sku-actions">
          <van-button size="large" type="danger" @click="addCartGood">加入购物车</van-button>
        </div>
        <div slot="sku-messages"></div>
      </van-sku>

      <CommonRecommendList :border="true"/>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import moment from "moment";
import { mapGetters, mapActions } from "vuex";

const quotaLimit = 10;
export default {
  name: "book-detail",
  data() {
    return {
      book: {
        id: "",
        title: "",
        author: "",
        price: "",
        classification: "",
        cover_url: "",
        content: "",
        publish_date: "",
        press: "",
        author_intro: ""
      },
      number: 1,
      showBase: false,
      loading: false,
      quota: quotaLimit
    };
  },
  beforeRouteLeave(to, from, next) {
    this.clearBookNumber();
    next();
  },
  methods: {
    ...mapActions(["addGood", "submitCartOrder"]),
    displaySku() {
      this.showBase = true;
    },
    async getBookDetail() {
      this.loading = true;

      const { id } = this.$route.params;
      try {
        const res = await this.$api.book.getBookDetail(id);
        const {
          data: { data }
        } = res;
        this.book = data.book;
      } catch (e) {
        this.$toast(e.message);
        this.$router.go(-1);
      } finally {
        this.loading = false;
      }
    },
    async addCartGood() {
      this.showBase = false;

      const bookID = this.book.id;
      const number = this.number;

      if (!this.$cookies.get("userID")) {
        this.$toast("登录后即可同步购物车");
        return;
      }

      await this.addGood({ bookID, number });
    },
    clearBookNumber() {
      this.number = 1;
    },
    handleStepperOverLimit(action) {
      if(action === "minus") {
        this.$toast("至少选择一本书籍")
      } else {
        this.$toast(`最多单次购买${this.quota}本书籍`)
      }
    },
    async handleBuyNow(skuData) {
      const bookID = this.book.id;
      await this.submitCartOrder([bookID]);
      this.$router.push("/cart/order?order_id=" + this.cartOrder.orderID);
    }
  },
  watch: {
    $route(to, from) {
      if (to.name === "book-detail") {
        this.clearBookNumber();
        this.getBookDetail();
      }
    }
  },
  computed: {
    ...mapGetters(["cartGoods", "cartOrder"]),
    sku() {
      return {
        price: this.book.price,
        collection_id: this.book.id,
        none_sku: true,
        tree: [],
        hide_stock: true
      };
    },
    goods() {
      return {
        title: this.book.title,
        picture: this.book.cover_url
      };
    },
    goodsCount() {
      return this.cartGoods.length;
    },
    intPart() {
      return Number(this.book.price)
        .toFixed(2)
        .split(".")[0];
    },
    floatPart() {
      const float = Number(this.book.price)
        .toFixed(2)
        .split(".")[1];
      return float;
    },
    publishDate() {
      return moment(new Date(this.book.publish_date)).format("YYYY-MM");
    }
  },
  created() {
    this.getBookDetail();
  }
};
</script>

<style lang="scss" scoped>
.book-detail {
  padding-bottom: 50px;
  .sku-stepper {
    padding: 20px;
    .sku-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
    }

    .quota-info {
      display: inline-block;
      color: #f44;
      font-size: 12px;
    }
  }
  .book-cover_url-wrapper {
    padding: 5px 0;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .panel {
    font-size: 14px;
    color: #333;
    font-weight: 400;
    .content {
      padding: 10px 15px 20px;
      line-height: 1.5;
      letter-spacing: 0.5px;
      text-align: justify;
      word-break: break-all;
      overflow: hidden;
    }
  }
  .checked-book {
    width: 100%;
    font-size: 12px;
    color: #999;
    font-weight: 400;
    .checked-box {
      display: flex;
      align-items: center;
    }
    .number {
      color: #333;
      font-size: 14px;
      margin: 0 10px;
    }
  }

  .book-info-wrapper {
    padding: 15px;
    .price-wrapper {
      font-size: 12px;
      color: #e4393c;
      font-weight: 700;
      line-height: 1.3;
      display: inline-flex;
      align-items: center;
      .int {
        font-size: 18px;
      }
      .float {
        font-weight: 400;
        margin-right: 6px;
      }
      .van-tag {
        padding: 0 4px;
        font-weight: 400;
      }
      .van-tag::after {
        border-color: #e4393c;
      }
    }
    .publish {
      font-size: 14px;
      color: #999;
      margin: 10px 0 0;
      p {
        line-height: 1.5;
        span {
          color: #333;
        }
      }
    }
    .book-title-wrapper {
      // display: flex;
      // align-items: center;
      position: relative;
      color: #333;
      overflow: hidden;
      .van-tag {
        padding: 0 2px;
        display: inline-block;
      }
      .book-title {
        font-weight: 700;
        font-size: 16px;
        line-height: 1.3;
        margin-left: 5px;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
  }
}
</style>
