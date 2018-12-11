<template>
  <div class="add-book">
    <commonNavbarLayout title="添加书籍">
      <div class="container">
        <van-cell-group>
          <van-field v-model="book.title" required clearable
                     label="书名" placeholder="请输入书名"></van-field>

          <van-cell center required>
            <van-uploader class="upload" accept="image/*" :after-read="onRead">
              <img v-if="book.coverUrl" :src="book.coverUrl" class="upload-image">
              <img v-else src="@/assets/add.png" class="upload-icon">
            </van-uploader>     
          </van-cell>

          <van-field v-model="book.price" required clearable label="价格"
                     placeholder="请输入价格（单位：元）" @focus="handlePriceClick"></van-field>
          <van-number-keyboard :show="keyboardShow" extra-key="." close-button-text="完成"
                               @blur="keyboardShow = false" @input="onInput" @delete="onDelete" />

          <van-field v-model="book.author" required clearable
                     label="作者" placeholder="请输入作者名"></van-field>

          <van-field v-model="book.press" required clearable
                     label="出版社" placeholder="请输入出版社名"></van-field>

          <van-field v-model="book.content" required clearable type="textarea"
                     label="书的内容" placeholder="请输入书的内容" rows="1" autosize></van-field>

          <van-field v-model="book.authorIntro" required clearable type="textarea"
                     label="作者信息" placeholder="请输入作者信息" rows="1" autosize></van-field>

          <van-field v-model="kind" required disabled
                     label="书的类别" placeholder="请点击下拉箭头选择书的类别" icon="arrow-down" @click-icon="handleClassClick"></van-field>
          <van-popup v-model="classShow" position="bottom" :overlay="true">
            <van-picker show-toolbar title="请选择书的类别" :columns="classification"
                        @cancel="onCancel" @confirm="onConfirm" />
          </van-popup>

          <van-cell>
            <van-button size="large" @click="handleSubmitClick">提交</van-button>
          </van-cell>
        </van-cell-group>
      </div>
    </commonNavBarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";
import moment from "moment";

export default {
  name: "add-book-page",
  data() {
    return {
      book: {
        title: '',
        coverUrl: '',
        price: '',
        author: '',
        publishDate: '',
        press: '',
        content: '',
        authorIntro: '',
        classification: ''
      },
      imageFile: {},
      keyboardShow: false,
      classShow: false,
      classification: ['阅享生活', '投资理财', '哲学心理', '亲子家教', '旅游美食', '健康养生', '社会科学', '传记', '历史古籍', '科技', '经济管理', '青春动漫', '小说', '文学', '其它'],
      kind: '',
    };
  },
  methods: {
    isTextVoid(key, value) {
      if (value === '') {
        this.$toast("有内容未填！");
        return 0;
      }
    },
    onRead(file) {
      this.imageFile = file.file;
      this.book.coverUrl = file.content;
    },
    handlePriceClick() {
      this.keyboardShow = true;
    },
    onInput(value) {
      if (value === '.' && this.book.price.indexOf('.') !== -1) {
        return;
      }
      this.book.price += value;
    },
    onDelete() {
      this.book.price = this.book.price.substring(0, this.book.price.length - 1);
    },
    handleClassClick() {
      this.classShow = true;
    },
    onCancel() {
      this.classShow = false;
    },
    onConfirm(picker, value) {
      this.classShow = false;
      this.book.classification = value + 1;
      this.kind = picker;
    },
    handleSubmitClick() {
      this.book.publishDate = moment().format("YYYY-MM-DD hh:mm:ss");
      console.log(this.book);
      for (const key in this.book) {
        if(this.isTextVoid(key, this.book[key]) === 0) {
          return;
        }
      }
      let bookData = new FormData();
      bookData.append("title", this.book.title);
      bookData.append("cover_url", this.imageFile);
      bookData.append("price", this.book.price);
      bookData.append("author", this.book.author);
      bookData.append("publish_date", this.book.publishDate);
      bookData.append("press", this.book.press);
      bookData.append("content", this.book.content);
      bookData.append("author_intro", this.book.authorIntro);
      bookData.append("classification", this.book.classification);
      this.$api.admin.addBook(bookData);
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if (isEmpty(this.user)) {
      this.$router.replace('/login');
    } else if (this.user.role !== "admin") {
        this.$router.replace('/user')
    }
  }
};
</script>

<style lang="scss" scoped>
  .container {
    margin-top: 30px;
    .upload {
      height: 90px;
      width: 90px;
      margin-left: 20px;
      border: 1px dashed #409EFF;
      border-radius: 6px;
      overflow: hidden;
      display: flex;
      justify-content: center;
      align-items: center;
      .upload-icon {
        height: 20px;
      }
      .upload-image {
        height: 90px;
      }
      .upload-image {
        position: absolute;
      }
    }
  }
</style>