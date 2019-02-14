<template>
  <div id="clips-table">
    <div class="get-clips-button">
      <el-button size="mini" type="primary" @click="getClips">クリップを取得</el-button>
    </div>
    <el-table
      :data="videoClips"
      ref="multipleTable"
      style="width: 100%"
      :header-cell-style="tableHeaderClassName"
      :row-style="tableRowClassName"
      @selection-change="handleSelectionChange"
    >
      <el-table-column prop="isSelected" type="selection"></el-table-column>
      <el-table-column prop="name" label="クリップ名"></el-table-column>
      <el-table-column prop="fullPath" label="クリップフルパス"></el-table-column>
      <el-table-column prop="mediaType" label="メディアタイプ"></el-table-column>
      <el-table-column prop="seconds" label="秒数"></el-table-column>
    </el-table>
    <div class="footer">
      <el-button size="mini" @click="toggleSelection()">クリア</el-button>
      <encoding-settings
        :presets="presets"
        :multipleSelection="multipleSelection"
        @change-preset="changePreset"
        @change-should-execute-encoding="changeShouldExecuteEncoding"
        @submit-jobs="encodeClips"
      ></encoding-settings>
    </div>
  </div>
</template>

<style>
.get-clips-button {
  margin: 5px 0px;
}
.check-box {
  text-align: center;
  margin: auto 5px auto 5px;
}
.footer {
  display: flex;
  margin: 5px 0px 5px 0px;
}
.encode-group {
  display: flex;
  margin: 0 0 0 auto;
  align-content: center;
}
</style>


<script>
import EncodingSettings from "./EncodingSettings.vue";

export default {
  name: "clips-table",
  components: { EncodingSettings },
  data() {
    return {
      options: [],
      multipleSelection: [],
      selectedPreset: null,
      shouldExecuteEncoding: false
    };
  },
  computed: {
    /**
     * @type {Array} Clips
     */
    videoClips: {
      get() {
        return this.$store.state.clips.filter(c => c.mediaType === "Video");
      }
    },
    /**
     * @type {Array} Clips
     */
    audioClips: {
      get() {
        return this.$store.state.clips.filter(c => c.mediaType === "Audio");
      }
    },
    presets: {
      get() {
        return this.$store.state.presets;
      }
    },
    cs: function() {
      return new CSInterface();
    }
  },
  created() {
  },
  mounted() {
    this.reloadPresets();
  },
  methods: {
    reloadPresets() {
      this.$store.commit("getPresets");
    },
    tableHeaderClassName() {
      return { backgroundColor: "#999ba0", width: "100%", color: "black" };
    },
    tableRowClassName() {
      return {
        backgroundColor: "#b2b6bf",
        width: "100%",
        color: "black",
        "font-weight": "bold"
      };
    },
    getClips(event) {
      this.$store.commit("getClips");
    },
    encodeClips(event) {
      const params = {
        indexes: this.multipleSelection.map(x => x.index),
        presetPath: this.selectedPreset,
        shouldExecuteEncoding: this.shouldExecuteEncoding
      };
      const str = JSON.stringify(params);
      if (process.env.NODE_ENV === 'development' && !window.__adobe_cep__) {
        console.log(`submit: ${str}`);
        return;
      }
      this.cs.evalScript("encodeVideoClips(" + str + ")");
    },
    changePreset(preset) {
      this.selectedPreset = preset;
    },
    changeShouldExecuteEncoding(val) {
      this.shouldExecuteEncoding = val;
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val);
      this.multipleSelection = val;
    }
  }
};
</script>