/**
 * get project
 * @return {Project} project
 */
function getProject() {
  return JSON.stringify(app.project);
}

/**
 * get path separator
 * @return{string} path separator
 */
function getSep() {
  if (Folder.fs === "Macintosh") {
    return "/";
  } else {
    return "\\";
  }
}

/**
 * get preset files
 * @return{string} preset files
 */
function getPresets() {
  // TODO Specify any location
  var files = new Folder(
    "~/Documents/Adobe/Adobe Media Encoder/13.0/Presets/"
  ).getFiles("*.epr");
  return files;
}

/**
 * encode selected video clips
 * @param {object} params to encode
 */
function encodeVideoClips(json) {
  try {
    const exportPath = Folder.selectDialog("Select a folder");
    if (!exportPath) {
      return;
    }
    const indexes = json.indexes;
    const shouldExecuteEncoding = json.shouldExecuteEncoding;
    const presetPath = new File(json.presetPath).fsName;

    const encoder = app.encoder;
    const activeSequence = app.project.activeSequence;
    const zeroPoint = app.project.activeSequence.zeroPoint;
    const clips = _getClips();
    if (clips) {
      app.encoder.launchEncoder();
      const workArea = 1;
      const boolRemoveUponCompletion = 1;
      // NOTE:シーケンス上のクリップとIn/Outと本体のIn/Outの時間が0.03秒ほどずれているため以下のoffsetをクリップのIn/Outに足している
      const offset = 0.03336666666666677;
      for (var i = 0; i < clips.length; i++) {
        var index = indexes[i];
        var clip = clips[index];
        if (clip == null) {
          continue;
        }
        activeSequence.setInPoint(clip.start.seconds == 0 ? clip.start.seconds : clip.start.seconds + offset);
        activeSequence.setOutPoint(clip.end.seconds + offset);
        var fullOutputPath = new File(exportPath.fsName + getSep() + clip.name)
          .fsName;
        encoder.encodeSequence(activeSequence, fullOutputPath, presetPath, workArea, boolRemoveUponCompletion);
      }
      if (shouldExecuteEncoding) {
        encoder.startBatch();
      }
      return;
    } else {
      alert("No clips not found");
    }
  } catch (e) {
    alert(e);
    throw e; 
  }
}

function _getClips() {
  var sequence = app.project.activeSequence;
  var result = [];
  if (sequence) {
    var trackGroups = [sequence.audioTracks, sequence.videoTracks];
    for (var gi = 0; gi < 2; gi++) {
      group = trackGroups[gi];
      for (var ti = 0; ti < group.numTracks; ti++) {
        var track = group[ti];
        var clips = track.clips;
        for (var ci = 0; ci < clips.numTracks; ci++) {
          var clip = clips[ci];
          clip.index = ci;
          clip.fullPath = clip.projectItem.getMediaPath();
          result.push(clip);
        }
      }
    }
  }
  return result;
}

/**
 * get clips in active sequence.
 * @return{clip[]} clips in active sequence
 */
function getClips() {
  var result = _getClips();
  return JSON.stringify(result);
}