<template>
  <lazy-component>
    <div class="cart-good">
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
              @change="countChange"
              max="99"
              :integer="true"
              :disabled="!changable"
              :disable-input="true"
            />
          </div>
        </div>
      </div>
    </div>
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
    }
  },
  data() {
    return {
      propChecked: this.checked,
      countValue: this.number
    };
  },
  methods: {
    checkedStatusChange(status) {
      this.$emit("checkedChange", status, this.index);
    },
    countChange(number) {
      this.$emit("countChange", number, this.index);
    }
  }
};
</script>

<style lang="scss">
.cart-good {
  display: flex;
  align-items: center;
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
