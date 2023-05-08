/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import {
  ticketsQuery,
  topicsQuery,
  skipSuccessFilter,
  skipDontTouchedFilter,
  skipErrorsFilter,
} from '@/utils';

export default class Api {
  static _getStore() {
    return new Promise((resolve) => {
      const request = indexedDB.open('questions');
      request.onsuccess = () => {
        const db = request.result;
        const transaction = db.transaction('questions', 'readwrite');
        const store = transaction.objectStore('questions');
        resolve(store);
      };
    });
  }

  static async getTopics() {
    const questions = await this.getQuestions();
    const topics = questions.reduce((acc, cur) => {
      const ids = acc.map((item) => item.key);
      cur.topic.forEach((top) => {
        if (!ids.includes(top.key)) acc.push(top);
      });
      return acc;
    }, []);
    return topics;
  }

  static async getTickets() {
    const questions = await this.getQuestions();
    const topics = questions.reduce((acc, cur) => {
      const ids = acc.map((item) => item.key);
      if (!ids.includes(cur.ticketNumber)) {
        acc.push({ key: cur.ticketNumber, value: cur.ticket_number });
      }
      return acc;
    }, []);
    return topics;
  }

  static async saveAnswer(id, isCorrect) {
    const store = await this._getStore();
    return new Promise((resolve) => {
      const res = store.get(id);
      res.onsuccess = (e) => {
        const question = e.target.result;
        question.trys += 1;
        question.errors = isCorrect ? question.errors : question.errors + 1;
        question.errorsInstock = isCorrect ? 0 : question.errorsInstock + 1;
        const update = store.put(question);
        update.onsuccess = () => {
          resolve(question);
        };
      };
    });
  }

  static async resetStatistic(mode, id) {
    const store = await this._getStore();
    const cursor = store.openCursor();
    return new Promise((resolve) => {
      cursor.onsuccess = (event) => {
        const cur = event.target.result;
        if (!cur) {
          resolve();
          return;
        }
        const topicKeys = cur?.value?.topic?.map((item) => item.key) || [];
        const match = mode === 'ticket'
          ? cur.value.ticketNumber === id
          : topicKeys.includes(id);
        if (!match) {
          cur.continue();
          return;
        }
        cur.value.trys = 0;
        cur.value.errors = 0;
        cur.value.errorsInstock = 0;
        cur.update(cur.value);
        cur.continue();
      };
    });
  }

  static async getQuestions(ctx) {
    const store = await this._getStore();
    const cursor = store.openCursor();
    const questions = [];
    return new Promise((resolve) => {
      cursor.onsuccess = (event) => {
        const cur = event.target.result;
        if (!cur) return resolve(questions);
        const isCorrect = ticketsQuery(cur.value, ctx?.query?.ticket)
              && topicsQuery(cur.value, ctx?.query?.topic)
              && skipDontTouchedFilter(cur.value, ctx?.filters?.skipDontTouched)
              && skipErrorsFilter(cur.value, ctx?.filters?.skipErrors)
              && skipSuccessFilter(cur.value, ctx?.filters?.skipSuccess);
        if (isCorrect) questions.push(cur.value);
        cur.continue();
      };
    });
  }
}
