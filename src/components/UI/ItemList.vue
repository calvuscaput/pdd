<template>
  <div class="item-list">
      <check-box
        class="check-box"
        v-for="item in options"
        :key="item.key"
        :title="item.value"
        @input="onInput"
        v-model="item.checked"
        block
      />
  </div>
</template>

<script>
import CheckBox from './CheckBox.vue';

export default {
  name: 'ItemList',
  components: {
    CheckBox,
  },
  data() {
    return {
      options: [],
    };
  },
  props: {
    value: {
      type: Array,
      required: true,
    },
    values: {
      type: Array,
      requred: true,
    },
  },
  computed: {
    checked: {
      get() {
        const list = this.options.filter((item) => item.checked).map((item) => item.key);
        return list;
      },
      set(val) {
        this.options = this.options.map((item) => ({
          ...item,
          checked: val.includes(item.key),
        }));
      },
    },
  },
  watch: {
    value(val) {
      this.checked = val;
    },
  },
  async mounted() {
    await this.$nextTick();
    this.options = this.values;
    this.checked = this.value;
  },
  methods: {
    onInput() {
      this.$emit('input', this.checked);
    },
  },
};
</script>

<style lang="scss">
.item-list {
  height: 300px;
  width: calc(100% + 16px);
  padding-right: 8px;
  overflow-y: scroll;
  .check-box {
    margin: 5px 0;
  }
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $primaryLight;
    border-radius: 4px;
  }
}
</style>
