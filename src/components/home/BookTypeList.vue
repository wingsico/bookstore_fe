<template>
  <div class="books-wrapper">
    <van-list
      @load="loadMore"
      finished-text="没有更多了~"
      :finished="isFinished"
      :loading="loading"
      :offset="70"
    >
      <div class="book-item-group" v-for="book in bookList.books" :key="book.book_id">
        <CommonBookItem
          :title="book.title"
          :price="book.price"
          :author="book.author"
          :type="book.classification"
          :cover_url="book.cover_url"
          :id="book.id"
          style="margin-bottom: 0"
        />
        <CommonGap/>
      </div>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    classification: {
      type: [Number, String],
      required: true,
      default: 1,
    }
  },
  data() {
    return {
      loading: false,
      bookList: {
        page: 1,
        size: 20,
        totalPage: 2,
        books: []
      }
    };
  },
  computed: {
    ...mapGetters(['classifications']),
    isFinished() {
      return this.bookList.page === this.bookList.totalPage;
    }
  },
  methods: {
    getBookList() {
      const { page, size } = this.bookList;
      this.loading = true;
      this.$api.book
        .getClassificationBooks({ page, size, classification: this.classification })
        .then(res => {
          const {
            data: { data }
          } = res;
          Object.assign(this.bookList, {
            totalPage: data.totalPage,
            books: this.bookList.books.concat(data.books)
          });
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
          throw e;
        });
    },
    loadMore() {
      const { page } = this.bookList;
      this.bookList.page += 1;
      this.getBookList();
    }
  },
  created() {
    this.getBookList();
  }
};
</script>
