<template>
  <div class="question-pdd">
    <div class="container">
      <div class="stats block">
        <div class="stat">Всего: {{total}}</div>
        <div class="stat">Осталось: {{total - cur}}</div>
        <div v-if="context.mode.infinity" class="stat">Кругов: {{laps}}</div>
      </div>
      <div v-if="questions.length">
        <question-answer
          :key="questions[cur].id"
          :question="questions[cur]"
          @answer="onAnswer($event)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import QuestionAnswer from '@/components/QuestionAnswer.vue';
// import { THEMES_MAP } from '@/utils';
// import axios from 'axios';
import Api from '@/utils/api';
import { shuffler } from '@/utils';

export default {
  name: 'QuestionPdd',
  components: {
    QuestionAnswer,
  },
  data() {
    return {
      questions: [],
      answered: [],
      total: 0,
      laps: 0,
      cur: 0,

    };
  },
  computed: {
    ...mapState(['context']),
    activeQuestion() {
      return this.questions[this.cur];
    },
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    async getQuestions() {
      this.questions = await Api.getQuestions(this.context);
      if (this.context.sorting.errorsInStockCountDescending) {
        this.questions = this.questions.sort((a, b) => b.errorsInstock - a.errorsInstock);
      }
      if (this.context.sorting.shuffle) this.questions = shuffler(this.questions);
      this.total = this.questions.length;
    },
    async onAnswer(isCorrect) {
      let question;
      if (this.context.mode.saveProgress) {
        question = await Api.saveAnswer(this.activeQuestion.id, isCorrect);
      } else {
        question = this.activeQuestion;
      }
      this.answered.push(question);
      this.cur += 1;

      if (this.cur === this.total) {
        if (!this.context.mode.infinity) {
          this.$router.push({ name: 'statistic' });
          return;
        }
        this.questions = this.answered;
        if (this.context.sorting.errorsInStockCountDescending) {
          this.questions = this.questions.sort((a, b) => b.errorsInstock - a.errorsInstock);
        }
        if (this.context.sorting.shuffle) this.questions = shuffler(this.questions);
        this.answered = [];
        this.cur = 0;
        this.laps += 1;
      }
    },
  },
};
</script>

<style lang="scss">
.question-pdd {
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 15px;
  .loading {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .stats {
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;
    .stat {
      margin: 5px;
    }
  }
}
</style>
