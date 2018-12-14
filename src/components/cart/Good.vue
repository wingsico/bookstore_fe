<template>
  <lazy-component>
    <v-touch tag="div" class="cart-good" v-on:press="() => deleteDisplay = true" data-no-menu>
      <div class="checked-wrapper" v-if="changable">
        <van-checkbox v-model="propChecked" @change="checkedStatusChange"></van-checkbox>
      </div>
      <div :class="{'good-card': true, 'shadow': shadow}">
        <div class="cover_url-wrapper">
          <div v-lazy:background-image="cover_url" :alt="title" class="img"/>
        </div>
        <div class="book-wrapper">
          <div class="title">{{ title }}</div>
          <div class="price-wrapper">
            <div class="price">
              ￥
              <span>{{price}}</span>
            </div>
            <van-stepper
              v-model="countValue"
              @overlimit="handleStepperOverLimit"
              @change="countChange"
              :min="1"
              :max="quota"
              :integer="true"
              :disabled="!changable"
            />
          </div>
        </div>
      </div>
      <div v-if="deleteDisplay" class="delete-wrapper">
        <div class="delete-button button" @click="handleGoodDelete">
          删除
        </div>
        <div class="cancel-button button" @click="deleteDisplay = false">
          取消
        </div>
      </div>
    </v-touch>
  </lazy-component>
</template>

<script>
import throttle from 'lodash/throttle';
export default {
  name: "cart-good",
  props: {
    checked: Boolean,
    cover_url: String,
    title: String,
    price: [String, Number],
    number: Number,
    index: Number,
    changable: {
      type: Boolean,
      default: true
    },
    shadow: {
      type:Boolean,
      default: true,
    },
    id: [String, Number],
  },
  data() {
    return {
      propChecked: this.checked,
      countValue: this.number,
      deleteDisplay: false,
      quota: 99,
    };
  },
  methods: {
    checkedStatusChange(status) {
      this.$emit("checkedChange", status, this.index);
    },
    countChange(number) {
      if (number > this.quota) {
        this.$toast(`最多单次购买${this.quota}本书籍`);
        return;
      }
      this.$emit("countChange", number, this.index);
    },
    handleGoodDelete() {
      this.deleteDisplay = false;
      this.$emit("delete", this.id)
    },
    handleStepperOverLimit(action) {
      if(action === "minus") {
        this.$toast("至少选择一本书籍")
      } else {
        this.$toast(`最多单次购买${this.quota}本书籍`)
      }
    },
  }
};
</script>

<style lang="scss">
.cart-good {
  display: flex;
  align-items: center;
  position: relative;

  .delete-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    align-items: center;

    .button {
      width: 50px;
      height: 50px;
      text-align: center;
      line-height: 50px;
      border-radius: 50%;
      color: #fff;
      font-size: 14px;
      margin: 0 40px;
    }

    .delete-button {
      background-color: #e4393c;
    }

    .cancel-button {
      background-color: gold;
    }
  }
  .shadow {
    box-shadow: 2px 0px 10px #ddd;
  }
  .checked-wrapper {
    margin-right: 10px;
  }
  .good-card {
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 15px 10px;
    flex: 1;
    .book-wrapper {
      font-size: 12px;
      word-break: break-all;
      min-height: 75px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 1.3;
      }
      .price-wrapper {
        display: flex;
        justify-content: space-between;

        .price {
          display: flex;
          align-items: center;
          flex: 1;
          color: #e4393c;
          font-size: 14px;
        }

        .van-stepper__minus,
        .van-stepper__plus {
          width: 25px;
          height: 25px;
          border: none;
          font-weight: 600;
          &:active {
            background-color: inherit;
          }
        }
        .van-stepper__minus--disabled,
        .van-stepper__minus--disabled:active,
        .van-stepper__plus--disabled,
        .van-stepper__plus--disabled:active {
          background-color: inherit;
        }
        .van-stepper__input {
          box-sizing: border-box;
          height: 25px;
          width: 40px;
          background: #e8e8ed;
          font-size: 12px;
          font-weight: 600;
        }
      }
    }
    .cover_url-wrapper {
      padding-right: 10px;
      font-size: 0px;
      max-height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .img {
        width: 75px;
        height: 75px;
        transition: all 0.3s;
        background-repeat: no-repeat;
        background-size: cover;
      }
    }
  }
}
</style>
