<template>
  <div class="statistic">
    <div class="container block">
      <tabs-pdd
        v-model="activeTab"
        :tabs="tabs"
      />
      <div class="wrapper">
        <table-pdd
        @reset="resetHandler"
        :header="reducedHeader"
        :data="currentData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { THEMES_MAP } from '@/utils';
import Api from '@/utils/api';

import TabsPdd from '@/components/UI/TabsPdd.vue';
import TablePdd from '@/components/UI/TablePdd.vue';

export default {
  name: 'StatisticPdd',
  components: {
    TabsPdd,
    TablePdd,
  },
  data() {
    return {
      activeTab: 'topic',
      header: [
        {
          key: 'touched',
          value: 'Просмотрено',
        },
        {
          key: 'count',
          value: 'Вопросов',
        },
        {
          key: 'errors',
          value: 'Ошибок',
        },
        {
          key: 'trys',
          value: 'Попыток',
        },
        {
          key: 'percent',
          value: '% Ошибок',
        },
      ],
      tabs: [
        {
          title: 'По темам',
          key: 'topic',
        },
        {
          title: 'По билетам',
          key: 'ticket',
        },
      ],
      themes: [],
      tickets: [],
    };
  },
  computed: {
    currentData() {
      return this.activeTab === 'topic'
        ? this.themes
        : this.tickets;
    },
    reducedHeader() {
      return [
        {
          value: this.activeTab === 'topic' ? 'Тема' : 'Билет',
          key: 'title',
        },
        ...this.header,
      ];
    },
  },
  async mounted() {
    await this.getData();
  },
  methods: {
    async resetHandler(id) {
      await Api.resetStatistic(this.activeTab, id);
      this.getData();
    },
    async getData() {
      this.themes = [];
      this.tickets = [];
      const answers = await Api.getQuestions();
      this.themes = Object.keys(THEMES_MAP)
        .map((key) => {
          const item = {};
          item.id = key;
          item.title = THEMES_MAP[key];
          item.trys = 0;
          item.errors = 0;
          item.count = 0;
          item.touched = 0;
          item.successCount = 0;
          return item;
        });
      answers.forEach((item) => {
        let ticket = this.tickets.find((t) => t.title === item.ticket_number);
        if (!ticket) {
          ticket = {
            id: item.ticketNumber,
            title: item.ticket_number,
            trys: 0,
            errors: 0,
            count: 0,
            touched: 0,
            successCount: 0,
          };
          this.tickets.push(ticket);
        }
        ticket.trys += item.trys;
        ticket.errors += item.errors;
        ticket.count += 1;
        ticket.percent = Math.round((ticket.errors / ticket.trys) * 100) || 0;
        ticket.touched = item.trys > 0 ? ticket.touched += 1 : ticket.touched;
        ticket.successCount = item.errorsInstock === 0 && item.trys > 0
          ? ticket.successCount += 1
          : ticket.successCount;
        item.topic.forEach((topic) => {
          const theme = this.themes.find((th) => th.id === topic.key);
          theme.trys += item.trys;
          theme.errors += item.errors;
          theme.count += 1;
          theme.percent = Math.round((theme.errors / theme.trys) * 100) || 0;
          theme.touched = item.trys > 0 ? theme.touched += 1 : theme.touched;
          theme.successCount = item.errorsInstock === 0 && item.trys > 0
            ? theme.successCount += 1
            : theme.successCount;
        });
      });
      this.themes.sort((a, b) => b.percent - a.percent);
      this.tickets.sort((a, b) => b.percent - a.percent);
    },
  },
};
</script>

<style lang="scss">
.statistic {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  .container {
    width: 1200px;
  }
  .wrapper {
    border: 1px solid $grey300;
    border-top: none;
    border-radius: 0px 0px 4px 4px;
  }
}
</style>
