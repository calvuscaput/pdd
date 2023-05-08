<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <div class="question-answer">
    <div class="block">
       <div class="image">
        <img :src="require('@/assets' + imageURL)" :alt="question.question">
      </div>
      <div class="info">
        <span>{{question.ticket_number}}</span>
        <span>{{question.title}}</span>
      </div>
      <div class="text">
        {{question.question}}
      </div>
    </div>

    <div class="block">
      <answer-variant
        v-for="answer in answers"
        :key="answer.answer_text"
        @click="onAnswerClick(answer)"
        :title="answer.answer_text"
        :right="answer.right"
        :wrong="answer.wrong"
      />
    </div>

    <div v-if="showContinue" class="block">
      <div class="tip">
        {{question.answer_tip}}
      </div>
      <button
        class="button primary"
        @click="onButtonClick()"
      >
        Продолжить
      </button>
    </div>
  </div>
</template>

<script>
import AnswerVariant from '@/components/UI/AnswerVariant.vue';
import { shuffler } from '@/utils';

export default {
  name: 'QuestionAnswer',
  components: {
    AnswerVariant,
  },
  props: {
    question: { type: Object, default: () => ({ empty: true }) },
  },
  data() {
    return {
      showContinue: false,
      answers: [],
    };
  },
  computed: {
    imageURL() {
      return this.question?.image
        ? this.question.image.substring(1)
        : '/images/no_image.jpg';
    },
  },
  created() {
    this.answers = shuffler(this.question.answers);
  },
  methods: {
    onAnswerClick(answer) {
      if (this.showContinue) return;
      if (answer.is_correct) {
        this.$emit('answer', true);
        return;
      }
      this.answers = this.answers.map((item) => ({
        ...item,
        wrong: item.answer_text === answer.answer_text,
        right: item.is_correct,

      }));
      this.showContinue = true;
    },
    onButtonClick() {
      this.$emit('answer', false);
    },
  },
};

</script>

<style lang="scss">
.question-answer {
  .image {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
    width: 100%;
    height: 250px;
    border: 1px solid $primary;
    border-radius: 12px;
    padding: 10px;

    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 1px solid $primary;
    margin-bottom: 10px;
    padding-bottom: 10px;
  }
  .question {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 15px;
  }
  .answers {
    .answer {
      margin-bottom: 15px;
      padding: 10px 10px 10px 40px;
      border: 1px solid red;
      font-size: 16px;
      cursor: pointer;
      &:hover {
        background-color: #ccc;
      }
    }
  }
  .tip {
    margin-bottom: 10px;
  }
  .button {
    display: block;
    width: 100%;
  }
}
</style>
