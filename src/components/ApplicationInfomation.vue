<template>
  <div id="application-infomation">
    <el-popover trigger="hover">
      <el-table :data="info" style="width: 100%">
        <el-table-column prop="key" label="Key" width="180"/>
        <el-table-column prop="value" label="Value" width="180"/>
      </el-table>
      <el-button type="info" icon="el-icon-info" slot="reference" circle size="mini"></el-button>
    </el-popover>
  </div>
</template>
x
<script>
export default {
  name: "application-infomation",
  computed: {
    info: function() {
      return [
        { key: "name", value: this.$store.state.appName },
        { key: "version", value: this.$store.state.appVersion }
      ];
    }
  },
  mounted() {
    this.$store.commit('getAppName');
    this.$store.commit('getAppVersion');
  }
};
</script>