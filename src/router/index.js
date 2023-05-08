import Vue from 'vue';
import VueRouter from 'vue-router';
import MenuPdd from '../views/MenuPdd.vue';
import QuestionPdd from '../views/QuestionPdd.vue';
import StatisticPdd from '../views/StatisticPdd.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'menu-pdd',
    component: MenuPdd,
  },
  {
    path: '/question',
    name: 'question-pdd',
    component: QuestionPdd,
  },
  {
    path: '/statistic',
    name: 'statistic',
    component: StatisticPdd,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
