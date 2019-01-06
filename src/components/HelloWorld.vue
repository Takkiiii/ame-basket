<template>
  <div id="hello-world">
    <div>This app name is {{ appName }} </div>
    <div>This app version is {{ appVersion }} </div>
  </div>
</template>

<script>
export default {
  name: 'hello-world',
  computed: {
    appName: {
      get() { return this.$store.state.appName; }
    },
    appVersion: {
      get() { return this.$store.state.appVersion; }
    }
  }
}
</script>>