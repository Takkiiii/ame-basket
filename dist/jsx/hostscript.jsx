/**
 * get project
 * @return {Project} project
 */
function getProject() {
    app.enableQE();
    return JSON.stringify(app.project);
}

/**
 * get path separator
 * @return{string} path separator
 */
function getSep() {
    if (Folder.fs === 'Macintosh') {
        return '/';
    } else {
        return '\\';
    }
}

/**
 * get preset files
 * @return{string} preset files
 */
function getPresets() {
    var files = new Folder("~/Documents/Adobe/Adobe\ Media\ Encoder/13.0/Presets/").getFiles("*.epr");
    return files
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
        const presetPath = new File(json.presetPath).fsName;
        app.enableQE();
        const encoder = app.encoder;
        const clips = _getClips();
        for (var i = 0; i < indexes.length; i++) {
            var index = indexes[i];
            var clip = clips[index];
            if (clip === null) {
                alert('clip sis null');
                continue;
            }
            var fullOutputPath = new File(exportPath.fsName + getSep() + clip.name).fsName;
            const workArea = 1;
            const boolRemoveUponCompletion = 1;
            encoder.encodeProjectItem(clip.projectItem, fullOutputPath, presetPath, workArea, boolRemoveUponCompletion, clip.start, clip.end);
        }
        encoder.startBatch();
    } catch(e) {
        alert(e);
        throw e;
    }
}

function _getClips() {
    app.enableQE();
    var sequence = app.project.activeSequence;
    var result = [];
    if (sequence) {
        var trackGroups = [sequence.audioTracks, sequence.videoTracks];
        for (var gi = 0; gi < 2; gi++) {
            group = trackGroups[gi];
            for (var ti = 0; ti < group.numTracks; ti++) {
                var track = group[ti];
                var clips = track.clips;
                for(var ci=0; ci<clips.numTracks; ci++){
                    var clip = clips[ci];
                    clip.index = ci;
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