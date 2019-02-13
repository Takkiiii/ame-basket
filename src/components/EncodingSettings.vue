<template>
  <div class="encode-group">
    <el-select v-model="selectedPreset" placeholder="プリセット" :disabled="multipleSelection.length < 1">
      <el-option
        v-for="preset in presets"
        :key="preset.name"
        :label="preset.name"
        :value="preset.fullPath"
      ></el-option>
    </el-select>
    <div class="check-box">
      <el-checkbox v-model="shouldExecuteEncoding">自動でエンコードする</el-checkbox>
    </div>
    <el-button
      size="mini"
      type="primary"
      @click="submitJobs"
      :disabled="multipleSelection.length < 1 || !selectedPreset"
    >クリップをエンコード</el-button>
  </div>
</template>

<style>
</style>

<script>
  export default {
    name: "encoding-settings",
    data() {
      return {
        shouldExecuteEncoding: false,
        selectedPreset: null
      };
    },
    props: {
      presets: {
        type: Array,
        required: true
      },
      multipleSelection: {
        type: Array,
        required: true
      }
    },
    watch: {
      selectedPreset(newVal, oldVal) {
        this.$emit('change-preset', newVal);
      },
      shouldExecuteEncoding(newVal, oldVal) {
        this.$emit('change-should-execute-encoding', newVal);
      }
    },
    methods: {
      submitJobs(event) {
        this.$emit("submit-jobs");
      }
    }
  }
</script>