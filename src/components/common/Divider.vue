<template>
  <div :class="['divider', typeClassName]"></div>
</template>

<script>
export default {
  name: 'divider',
  props: {
    type: String,
  },
  computed: {
    typeClassName() {
      return this.type === 'vertical' ? 'divider-vertical' : 'divider-horizontal';
    }
  }
}
</script>

<style lang="scss" scoped>
  .divider {
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    color: rgba(0,0,0,.65);
    list-style: none;
    background: #e8e8e8;
    &.divider-vertical {
      margin: 0 8px;
      display: inline-block;
      height: .9em;
      width: 1px;
      vertical-align: middle;
      position: relative;
      top: -.06em;
    }
    &.divider-horizontal {
      display: block;
      height: 1px;
      width: 100%;
      min-width: 100%;
      margin: 24px 0;
      clear: both;
    }
  }
</style>
