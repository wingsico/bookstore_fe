<template>
  <div class="login-footer" v-once>
    <h4 class="team-title">团队成员</h4>
    <div class="team-container">
      <CommonAvatar
        v-for="person in team"
        :key="person.name"
        :src="person.avatar"
        :name="person.name"
        class="teamer-avatar"
      />
    </div>

  </div>
</template>

<script>

export default {
  name: "login-footer",
  data() {
    return {
      team: [{
        name: 'wingsico',
        avatar: 'assets/wingsico.jpeg',
      }, {
        name: '熊超',
        avatar: 'assets/xiongchao.png',
      }, {
        name: '刘臻',
        avatar: 'assets/liuzhen.jpg',
      },{
        name: '隋旭辉',
        avatar: 'assets/suixuhui.jpg',
      },{
        name: '刘璞珩',
        avatar: 'assets/liupuheng.jpg',
      },{
        name: '唐劲',
        avatar: 'assets/tangjin.jpg',
      }]
    };
  },
};
</script>

<style lang="scss" scoped>
.login-footer {
  position: relative;
  border-top: 1px solid #efefef;
  // text-align: center;
  font-size: 14px;
  margin: 44px 25px 0;

  .team-title {
    margin: 0;
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    font-weight: 400;
    font-size: 12px;
    color: #ccc;
    background: #fff;
    padding: 5px 15px;
    letter-spacing: 5px;
  }

  .team-container {
    margin-top: 40px;
    display: flex;
    flex-wrap: wrap;

    .teamer-avatar {
      width: 33.33%;
    }
  }


}
</style>
