<template>
  <div id="app">
    <application-infomation />
    <clips-table />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import ApplicationInfomation from './components/ApplicationInfomation.vue';
import ClipsTable from './components/ClipsTable.vue';
export default {
  name: "app",
  components: { ApplicationInfomation, ClipsTable },
};
</script>