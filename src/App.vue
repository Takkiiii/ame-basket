<template>
  <div id="app">
    <application-infomation />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import ApplicationInfomation from './components/ApplicationInfomation.vue';
export default {
  name: "app",
  components: { ApplicationInfomation },
};
</script>