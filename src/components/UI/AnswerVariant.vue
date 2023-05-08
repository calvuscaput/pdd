<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <div class="answer-variant" :class="{wrong: wrong, right: right}" @click="onClick">
    <span>{{title}}</span>
  </div>
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    title: {
      type: String,
      default: '',
    },
    right: {
      type: Boolean,
      default: false,
    },
    wrong: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
.answer-variant {
  padding: 16px;
  color: $grey700;
  border: 1px solid $grey300;
  background-color: $grey100;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  &.wrong {
    color: $red800;
    border: 1px solid $red300;
    background-color: $red100;
  }
  &.right {
    color: $green800;
    border: 1px solid $green300;
    background-color: $green100;
  }
  span {
    font-size: 12px;
  }
}
</style>
