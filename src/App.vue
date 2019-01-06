<template>
  <div id="app">
    This is App.vue.
    <hello-world />
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: "app",
  components: { HelloWorld },
};
</script>