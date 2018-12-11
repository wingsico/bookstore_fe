<template>
  <div class="admin">
    <router-view v-if="showRouterView" style="z-indx: 200"></router-view>
    <commonNavbarLayout title="管理员功能" v-else>
      <div class="container">
        <router-link
          tag="div"
          class="admin-option"
          to="/user/admin/addBook"
        >
          <van-button size="large">添加书籍</van-button>
        </router-link>
        <router-link
          tag="div"
          class="admin-option"
          to="/user/admin/allOrder"
        >
          <van-button size="large">查看订单</van-button>
        </router-link>
        <router-link
          tag="div"
          class="admin-option"
          to="/user/admin/allUserInfo"
        >
          <van-button size="large">用户信息</van-button>
        </router-link>
      </div>
    </commonNavbarLayout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "user-admin",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["user"]),
    showRouterView() {
        return this.$route.fullPath !== '/user/admin'
    }
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
    .admin-option {
      margin-top: 15px;
    }
  }
</style>