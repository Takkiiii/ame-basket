<template>
  <div id="clips-table">
    <el-button type="primary" v-on:click="getClips">クリップを取得</el-button>
    <div>ビデオクリップ数: {{ clips.filter(c => c.mediaType === 'Video').length }}</div>
    <div>オーディオクリップ数: {{ clips.filter(c => c.mediaType === 'Audio').length }}</div>
    <el-table
      :data="videoClips"
      style="width: 100%">
      <el-table-column
        prop="trackIndex"
        label="トラックインデックス"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="クリップ名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mediaType"
        label="メディアタイプ"
        width="180">
      </el-table-column>
      <el-table-column
        prop="seconds"
        label="秒数"
        width="180">
      </el-table-column>
    </el-table>
     <el-button type="primary" v-on:click="encodeClips">クリップをエンコード</el-button>
  </div>
</template>

<script>
export default {
  name: "clips-table",
  data() {
    return {};
  },
  mounted() {},
  computed: {
    /**
     * @type {Array} Clips
     */
    clips: {
      get() {
        return this.$store.state.clips;
      }
    },
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
    }
  },
  methods: {
    getClips(event) {
      this.$store.commit("getClips");
    },
    encodeClips(event) {
      var cs = new CSInterface();
      cs.evalScript('encodeAllVideoClips()');
    }
  }
};
</script>