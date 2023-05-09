<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="menu-pdd">
    <div class="container">
      <div class="config">
        <div class="block">
          <h4>Тема:</h4>
          <item-list
            v-if="topics.length"
            v-model="context.query.topic"
            :values="topics"
          />
        </div>
        <div class="block">
          <h4>Билет:</h4>
          <item-list
            v-if="tickets.length"
            v-model="context.query.ticket"
            :values="tickets"
          />
        </div>
        <div class="block">
          <h4>Фильтры:</h4>
          <check-box
            v-model="context.filters.skipSuccess"
            title="Пропустить Успешные вопросы"
            block
          />
          <check-box
            v-model="context.filters.skipErrors"
            title="Пропустить ошибки"
            block
          />
          <check-box
            v-model="context.filters.skipDontTouched"
            title="Пропустить неизвестные вопросы"
            block
          />
        </div>
        <div class="block">
          <h4>Сортировка:</h4>
          <check-box
              v-model="context.sorting.errorsInStockCountDescending"
              title=" Сначала с наибольшим количеством ошибок"
              block
            />
          <check-box
            v-model="context.sorting.shuffle"
            title="Перемешать"
            block
          />
        </div>
        <div class="block">
          <h4>Режим:</h4>
          <check-box
            v-model="context.mode.saveProgress"
            title="Сохранять прогресс"
            block
          />
          <check-box
            v-model="context.mode.infinity"
            title="Бесконечный цикл вопросов"
            block
          />
        </div>
      </div>
      <div
        class="block go"
        @click="goTrain()"
      >
        Начать тренировку
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Api from '@/utils/api';
import CheckBox from '@/components/UI/CheckBox.vue';
import ItemList from '@/components/UI/ItemList.vue';

export default {
  name: 'MenuPdd',
  components: {
    CheckBox,
    ItemList,
  },
  data() {
    return {
      context: null,
      topics: [],
      tickets: [],
    };
  },
  watch: {
    context: {
      deep: true,
      immediate: true,
      handler(val) {
        const ctx = this.$store.state.context;
        if (!val) {
          this.context = ctx;
          return;
        }
        this.setContext(val);
      },
    },
  },
  async mounted() {
    this.topics = await Api.getTopics();
    this.tickets = await Api.getTickets();
  },
  methods: {
    ...mapActions(['setContext']),
    goTrain() {
      this.$router.push({ name: 'question-pdd' });
    },
  },
};
</script>

<style lang="scss">
.menu-pdd {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 15px;
  .block.go {
    color: $white;
    background-color: $primary;
    text-align: center;
    &:hover, &:active {
      background-color: $primaryDark;
      cursor: pointer;
    }
  }
  .config {
    margin-bottom: 15px;
  }
  h4 {
    margin-bottom: 15px;
  }
}
</style>
