<template>
  <div class="nav-bar">
    <div class="logo">
      <h5>ПДД</h5>
    </div>
    <div class="links">
      <router-link class="link" to="/">Меню</router-link>
      <router-link class="link" to="/statistic">Статистика</router-link>
    </div>
  </div>
</template>
<script>

export default {
  name: 'NavBar',
};
</script>

<style lang="scss">
.nav-bar {
  color: $white;
  height: 48px;
  padding: 5px 14px;
  background-color: $primary;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .logo {
    margin-right: 41px;
    h5 {
      color: $white;
    }
  }
  .links {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .link {
      margin-right: 25px;
      text-decoration: none;
      color: $white;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
