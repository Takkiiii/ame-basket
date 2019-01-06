<template>
  <div id="application-infomation">
    <el-popover placement="right" width="400" trigger="click">
      <el-table :data="info" style="width: 100%">
        <el-table-column prop="key" label="Key" width="180"/>
        <el-table-column prop="value" label="Value" width="180"/>
      </el-table>
      <el-button slot="reference">Click to activate</el-button>
    </el-popover>
  </div>
</template>

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
  }
};
</script>