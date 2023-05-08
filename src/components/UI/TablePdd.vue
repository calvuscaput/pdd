<template>
  <div class="table-pdd">
    <table>
      <thead>
        <tr>
          <th
            v-for="item in header"
            :key="item.key"
          >
            <div class="cell">
              {{item.value}}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in data"
          :key="row.id"
          @click="onClick(row.id)"
        >
          <td
            v-for="col in header"
            :key="col.key"
          >
            <div class="cell">
              <div
                class="progress touched"
                :style="`width: ${(row.successCount/row.count) * 100}%`"
              />
              <div class="progress" :style="`width: ${row.percent}%`"/>
              <span>{{row[col.key]}}</span>
            </div>
          </td>

        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'TablePdd',
  props: {
    header: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  methods: {
    onClick(id) {
      this.$emit('reset', id);
    },
  },
};
</script>

<style lang="scss">
.table-pdd {
  width: 100%;
  padding: 16px;
  table {
    width: 100%;
  }
  th, td {
    height: 38px;
    vertical-align: middle;
    font-size: 16px;
    color: $headerText
  }
  th {
    border-bottom: 2px solid $grey300;
    border-top: 1px solid $grey300;
    font-weight: 800;
    line-height: 19px;
  }
  tr {
    border-bottom: 1px solid $grey300;
    &:hover {
      background-color: $grey300;
      cursor: pointer;
    }
  }
  .cell {
    text-align: center;
    position: relative;
    background-color: transparent;
    span {
      position: relative;
      z-index: 2;
    }
    .progress {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 50%;
      background-color: $red300;
      display: none;
      z-index: 1;
      &.touched {
        top: 0;
        bottom: auto;
        background-color: $green300;
        height: 50%;
      }
    }
  }
  td {
    font-weight: 400;
    line-height: 28px;
    &:last-child {
      & .cell {
        border: 1px solid $grey700;
        .progress {
          display: block;
        }
      }
    }
    &:first-child {
      width: 600px;
      & .cell {

        text-align: left;
      }
    }
  }
}
</style>
