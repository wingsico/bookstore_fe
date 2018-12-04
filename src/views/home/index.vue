<template>
  <div class="home-page">
    <van-swipe :autoplay="3000" class="swipe-wrapper">
      <van-swipe-item v-for="(url, index) in swipeUrls" :key="index" class="swipe-item">
        <img :src="url" />
      </van-swipe-item>
    </van-swipe>
    <div class="books-wrapper">
      <van-list
        @load="loadMore"
        finished-text="没有更多了~"
        :finished="isFinished"
        :loading="loading"
        :offset="100"
      >
        <CommonBookItem
          v-for="book in bookList.books"
          :key="book.book_id"
          :title="book.title"
          :price="book.price"
          :author="book.author"
          :type="book.type"
          :cover="book.cover"
        />
      </van-list>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'home-page',
  data() {
    return {
      swipeUrls: [
        'http://img62.ddimg.cn/2018/11/27/201811271727186780.jpg',
        'http://img62.ddimg.cn/2018/11/27/201811271726268191.jpg',
        'http://img63.ddimg.cn/2018/11/27/2018112717265184580.jpg',
        'http://img60.ddimg.cn/upload_img/00316/by/750x315_wzh_20181121-1542792577.jpg',
        'http://img61.ddimg.cn/upload_img/00570/tongshu/750x315_djj_1101-1541138681.jpg',
      ],
      loading: false,
      bookList: {
        page: 1,
        pageSize: 20,
        totalPage: 2,
        books: [],
      }
    };
  },
  computed: {
    isFinished() {
      return this.bookList.page === this.bookList.totalPage
    }
  },
  methods: {
    async getBookList() {
      const {page, pageSize} = this.bookList;
      this.loading = true;
      setTimeout(async () => {
        const res = await this.$api.user.getBookList({page, pageSize})
        this.loading = false;
        const {data: {data}} = res;
        Object.assign(this.bookList, {
        page: data.page,
        books: this.bookList.books.concat(data.books)
      });
      }, 1000)

    },
    loadMore() {
      const {page} = this.bookList;
      this.bookList.page += 1;
      this.getBookList();
    }
  },
  created() {
    this.getBookList()
  }
}
</script>
<style lang="scss" scoped>
.home-page {
  .swipe-wrapper {
    .swipe-item {
      img {
        width: 100%;
        height: 160px;
      }
    }
  }
}
</style>
