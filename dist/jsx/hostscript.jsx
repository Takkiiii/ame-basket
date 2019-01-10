/**
 * get project
 * @return {Project} project
 */
function getProject() {
    app.enableQE();
    return JSON.stringify(app.project);
}

function getSep() {
    if (Folder.fs === 'Macintosh') {
        return '/';
    } else {
        return '\\';
    }
}

function getPresets() {
    var files = new Folder("~/Documents/Adobe/Adobe\ Media\ Encoder/13.0/Presets/").getFiles("*.epr");
    return files
}

/**
 * encode selected video clips
 * @param {string} selectedClipsIndex 
 */
function encodeVideoClips(params) {
    var exportPath = Folder.selectDialog("Select a folder");
    if (!exportPath) {
        return;
    }
    const json = JSON.parse(params);
    const indexes = json.indexes;
    const presetPath = json.presetPath;
    app.enableQE();
    var encoder = app.encoder;
    var clips = _getClips();
    for (var i = 0; i < indexes.length; i++) {
        var index = indexes[i];
        var clip = clips[index];
        if (clip.mediaType == 'Audio') {
            continue;
        }
        var fullOutputPath = exportPath.fsName + getSep() + clip.name;
        // var presetPath = '/Users/takky/Documents/Adobe/Adobe Media Encoder/13.0/Presets/H.264.epr';
        var workArea = 1;
        var boolRemoveUponCompletion = 1;
        encoder.encodeProjectItem(clip.projectItem, fullOutputPath, presetPath, workArea, boolRemoveUponCompletion, clip.start, clip.end);
    }
    encoder.startBatch();
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
 */
function getClips() {
    var result = _getClips();
    return JSON.stringify(result);
}