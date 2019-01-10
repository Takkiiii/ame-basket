<template>
  <div id="app">
    <div>
      <app-header />
    </div>
    <div>
      <clips-table />
    </div>
  </div>
</template>

<style>
</style>

<script>
import AppHeader from './components/Header.vue';
import ClipsTable from './components/ClipsTable.vue';
export default {
  name: "app",
  components: { AppHeader, ClipsTable },
};
</script>