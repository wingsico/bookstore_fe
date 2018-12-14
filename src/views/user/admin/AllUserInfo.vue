<template>
  <CommonNavbarLayout title="用户信息查询">
    <div class="all-user-info">
      <div class="container">
        <van-search
          v-model="searchKey"
          placeholder="输入需要查询的用户名"
          show-action
          @search="onSearch"
          @clear="onClear"
        >
          <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="users">
          <UserCard v-for="user in users" :key="user.id" :user="user"/>
        </div>
      </div>
    </div>
  </CommonNavbarLayout>
</template>

<script>
import { mapGetters } from "vuex";
import isEmpty from "lodash/isEmpty";

export default {
  name: "all-user-info-page",
  data() {
    return {
      searchKey: "",
      users: []
    };
  },
  methods: {
    getAllUsers() {
      this.$api.admin
        .getAllUsers()
        .then(res => {
          this.users = res.data.data.users;
        })
        .catch(err => {
          console.log(err);
        });
    },
    roleText(role) {
      return role === "admin" ? "管理员" : "普通用户";
    },
    onSearch() {
      if (this.searchKey === "") {
        this.getAllUsers();
        return;
      }
      this.$api.admin
        .query(this.searchKey)
        .then(res => {
          this.users = [];
          this.users[0] = res.data.data.user;
        })
        .catch(err => {
          this.$toast("没有此用户名！");
          this.searchKey = "";
        });
    },
    onClear() {
      this.getAllUsers();
    }
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    if (isEmpty(this.user)) {
      this.$router.replace("/login");
    } else if (this.user.role !== "admin") {
      this.$router.replace("/user");
    } else {
      this.getAllUsers();
    }
  }
};
</script>

<style lang="scss" scoped>
.all-user-info {
  .container {
    .users {
      padding: 0 0 0 10px;
    }
  }
}
</style>
