<template>
  <div class="avatar-wrapper">
    <img :src="avatarSrc" :alt="name" class="avatar" :width="size" :height="size">
    <span class="name">{{ name }}</span>
  </div>
</template>

<script>
export default {
  name: 'avatar',
  props: {
    src: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: 50,
    }
  },
  computed: {
    avatarSrc() {
      return require(`@/${this.src}`);
    }
  }
}
</script>

<style lang="scss" scoped>
  .avatar-wrapper {
    display: inline-flex;
    flex-direction: column;
    padding: 5px;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      box-shadow: 1px 1px 5px #333;
    }

    .name {
      font-size: 12px;
      color: #333;
      font-weight: 300;
      line-height: 1.5;
      margin-top: 5px;
    }
  }
</style>
