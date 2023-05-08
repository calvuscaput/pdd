<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="tabs-pdd">
    <div
      v-for="tab in tabs"
      :key="tab.key"
      class="tab"
      :class="{active: tab.key === value}"
      @click="onClick(tab)"
    >
      <span>{{tab.title}}</span>
    </div>
    <div class="space" />
  </div>
</template>

<script>
export default {
  name: 'TabsPdd',
  props: {
    value: {
      type: String,
      required: true,
    },
    tabs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onClick(tab) {
      this.$emit('input', tab.key);
    },
  },
};
</script>

<style lang="scss">
.tabs-pdd {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;

  .tab {
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    color: $primary;
    border: 1px solid $grey300;
    border-radius: 4px 4px 0px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    padding: 0 20px;
    border-left: none;
    cursor: pointer;
    &:first-child {
      border-left: 1px solid $grey300;
    }
    &.active {
      border-bottom: none;
      color: $secondary;
    }
  }
  .space {
    flex: 1;
    border-bottom: 1px solid $grey300;
  }
}
</style>
