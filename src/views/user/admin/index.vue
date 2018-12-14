<template>
  <div class="admin">
    <router-view v-if="showRouterView" style="z-index: 200"></router-view>
    <CommonNavbarLayout title="后台管理" v-else>
      <h2 class="title">功能集成</h2>
      <van-cell-group class="container">
        <van-cell
          v-for="option in adminOptions"
          :key="option.text"
          :title="option.text"
          :to="option.to"
          is-link
        />
      </van-cell-group>
    </CommonNavbarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "user-admin",
  data() {
    return {
      adminOptions: [
        {
          text: "书籍添加",
          to: "/user/admin/addBook"
        },
        {
          text: "订单查询",
          to: "/user/admin/allOrder"
        },
        {
          text: "用户信息查询",
          to: "/user/admin/allUserInfo"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["user"]),
    showRouterView() {
      return this.$route.fullPath !== "/user/admin";
    }
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
.admin {
  .title {
    margin: 20px 0 10px;
    font-size: 14px;
    font-weight: 400;
    color: #999;
    padding-left: 15px;
  }
  .container {
    .admin-option {
      margin-top: 15px;
    }
  }
}
</style>
