<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <label class="check-box" :class="{ checked: value, db: block }" >
    {{title}}
    <input class="checkbox" :checked="value" type="checkbox" @change="onChange">
  </label>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    value: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onChange(e) {
      this.$emit('input', e.target.checked);
    },
  },
};
</script>

<style lang="scss">
.check-box {
  padding: 8px 12px;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;
  border-radius: 6px;
  display: inline-block;
  border: 1px solid $primary;
  color: $primary;
  margin-bottom: 5px;
  .checkbox {
    display: none;
  }
  &.checked {
    color: $white;
    background-color: $primary;
    &:hover, &:active {
    background-color: $primaryDark;
  }
  }
  &:hover, &:active {
    background-color: $grey100;
  }
  &.db {
    display: block;
  }
}
</style>
