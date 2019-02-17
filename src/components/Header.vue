<template>
  <div id="app-header">
    <div>
      <div>買い物かご</div>
    </div>
    <application-infomation class="info"/>
  </div>
</template>

<style scoped>
#app-header {
  display: flex;
}
.info {
  display: block;
  margin: 0 0 0 auto;
}
</style>

<script>
import ApplicationInfomation from './ApplicationInfomation.vue';

export default {
  name: 'app-header',
  components: { ApplicationInfomation },
  created() {
  },
  mounted() {
  }
}
</script>