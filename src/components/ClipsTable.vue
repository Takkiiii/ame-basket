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
      @selection-change="handleSelectionChange">
      <el-table-column
        prop="isSelected"
        type="selection">
      </el-table-column>
      <el-table-column
        prop="name"
        label="クリップ名">
      </el-table-column>
      <el-table-column
        prop="mediaType"
        label="メディアタイプ">
      </el-table-column>
      <el-table-column
        prop="seconds"
        label="秒数">
      </el-table-column>
    </el-table>
    <div class="footer">
      <el-button size="mini" @click="toggleSelection()">クリア</el-button>
      <div class="encode-group">
        <el-select v-model="value" placeholder="プリセット" :disabled="multipleSelection.length < 1">
          <el-option
            v-for="preset in presets"
            :key="preset.name"
            :label="preset.name"
            :value="preset.fullPath">
          </el-option>
        </el-select>
        <el-button size="mini" type="primary" @click="encodeClips" :disabled="multipleSelection.length < 1 || !value">クリップをエンコード</el-button>
      </div>
    </div>
  </div>
</template>

<style>
.get-clips-button {
  margin: 5px 0px;
}
.footer {
  display: flex;
  margin: 5px 0px 5px 0px;
}
.encode-group {
  display: flex;
  margin: 0 0 0 auto;
}
</style>


<script>
export default {
  name: "clips-table",
  data() {
    return {
      cs: new CSInterface(),
      options: [],
      multipleSelection: [],
      value: ''
    };
  },
  computed: {
    /**
     * @type {Array} Clips
     */
    videoClips: {
      get() {
        return this.$store.state.clips.filter(c => c.mediaType === 'Video');
      }
    },
    /**
     * @type {Array} Clips
     */
    audioClips: {
      get() {
        return this.$store.state.clips.filter(c => c.mediaType === 'Audio');
      }
    },
    presets: {
      get() {
        return this.$store.state.presets;
      }
    }
  },
  mounted() {
    this.reloadPresets();
    console.log(`clips table is mounted.`);
  },
  methods: {
    reloadPresets() {
      this.$store.commit('getPresets');
    },
    tableHeaderClassName() {
      return { backgroundColor: '#999ba0', width: '100%', color: 'black' };
    },
    tableRowClassName() {
      return { backgroundColor: '#b2b6bf', width: '100%',  color: 'black', 'font-weight': 'bold' };
    },
    getClips(event) {
      this.$store.commit("getClips");
    },
    encodeClips(event) {
      const params = { indexes: this.multipleSelection.map(x => x.index), presetPath: this.value };
      const str = JSON.stringify(params);
      this.cs.evalScript('encodeVideoClips('  + str +')');
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
        console.log(this.multipleSelection);
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>