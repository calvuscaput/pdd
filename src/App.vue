<template>
  <div id="app">
    <div v-if="!loading">
      <nav-bar />
    <router-view/>
    </div>
  </div>
</template>

<script>
import { initDB } from '@/utils';
import NavBar from '@/components/UI/NavBar.vue';

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data() {
    return {
      loading: true,
    };
  },
  async mounted() {
    this.loading = true;
    await initDB();
    this.loading = false;
  },

};
</script>
