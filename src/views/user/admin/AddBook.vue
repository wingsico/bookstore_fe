<template>
  <CommonNavbarLayout title="书籍添加">
    <div class="add-book">
      <div class="container">
        <van-cell-group :border="false">
          <van-field v-model="book.title" required clearable label="书名" placeholder="请输入书名"></van-field>

          <van-cell center required style="display: flex;">
            <van-uploader class="upload" accept="image/*" :after-read="onRead">
              <img v-if="book.coverUrl" :src="book.coverUrl" class="upload-image">
              <div v-else class="upload-icon">
                <span class="tip">上传封面</span>
                <van-icon name="upgrade"/>
              </div>
            </van-uploader>
          </van-cell>

          <van-field
            v-model.number="book.price"
            required
            clearable
            label="价格"
            placeholder="请输入价格(最多两位小数, 元)"
            type="number"
            @input="handlePriceInput"
          ></van-field>

          <van-field v-model="book.author" required clearable label="作者" placeholder="请输入作者名"></van-field>

          <van-field v-model="book.press" required clearable label="出版社" placeholder="请输入出版社名"></van-field>

          <van-field
            v-model="book.content"
            required
            clearable
            type="textarea"
            label="书的内容"
            placeholder="请输入书的内容"
            rows="1"
            autosize
          ></van-field>

          <van-field
            v-model="book.authorIntro"
            required
            clearable
            type="textarea"
            label="作者信息"
            placeholder="请输入作者信息"
            rows="1"
            autosize
          ></van-field>

          <van-cell @click="handleClassClick" style="padding: 0">
            <van-field
              v-model="kind.text"
              required
              disabled
              label="类别"
              placeholder="选择书的类别"
              icon="arrow-down"
            />
          </van-cell>

          <van-popup v-model="classShow" position="bottom" :overlay="true">
            <van-picker
              show-toolbar
              title="请选择书的类别"
              :columns="classificationNames"
              @cancel="onCancel"
              @confirm="onConfirm"
            />
          </van-popup>

          <van-button style="margin-top: 20px" size="large" @click="handleSubmitClick" type="primary" :loading="loading">添加书籍</van-button>
        </van-cell-group>
      </div>
    </div>
  </CommonNavbarLayout>
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
        title: "",
        coverUrl: "",
        price: "",
        author: "",
        publishDate: "",
        press: "",
        content: "",
        authorIntro: "",
        classification: ""
      },
      imageFile: {},
      classShow: false,
      kind: {},
      loading: false,
    };
  },
  methods: {
    isTextVoid(key, value) {
      if (value === "") {
        this.$toast("有内容未填！");
        return 0;
      }
    },
    onRead(file) {
      this.imageFile = file.file;
      this.book.coverUrl = file.content;
    },
    handlePriceInput(value) {
      const float = String(value).split('.')[1];
      if (value > 10000) {
        this.$toast('价格最大不超过10000元');
        this.book.price = 10000;
        return;
      }

      if (float !== undefined && float.length > 2) {
        this.$toast('价格最多保留两位小数');
        this.book.price = Number(value).toFixed(2);
        return;
      }

      this.book.price = value;
    },
    handleClassClick() {
      this.classShow = true;
    },
    onCancel() {
      this.classShow = false;
    },
    onConfirm(picker, value) {
      this.classShow = false;
      this.book.classification = picker.key;
      this.kind = picker;
    },
    async handleSubmitClick() {
      this.book.publishDate = moment().format("YYYY-MM-DD hh:mm:ss");
      for (const key in this.book) {
        if (this.isTextVoid(key, this.book[key]) === 0) {
          return;
        }
      }
      this.loading = true;

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

      try {
        const res = await this.$api.admin.addBook(bookData);
        this.$toast("添加成功");
        const {data: {data: { book }}} = res;
        this.$router.replace(`/book/detail/${book.id}`)
      } catch(e) {
        throw e;
      } finally {
        this.loading = false;
      }
    }
  },
  computed: {
    ...mapGetters(["user", "classifications"]),
    classificationNames() {
      return this.classifications.map(({ id, name }) => ({text: name, key: id}));
    },
},
  created() {
    if (isEmpty(this.user)) {
      this.$router.replace("/login");
    } else if (this.user.role !== "admin") {
      this.$router.replace("/user");
    }
  }
};
</script>

<style lang="scss" scoped>
.add-book {
  position: relative;
  top: -1px;
  padding: 10px 20px;
}
.container {
  .upload {
    height: 90px;
    width: 90px;
    margin-left: 20px;
    border: 1px dashed #409eff;
    border-radius: 6px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    .upload-icon {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #999;
      .tip {
        margin-right: 5px;
      }
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
