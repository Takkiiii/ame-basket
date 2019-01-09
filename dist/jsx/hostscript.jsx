function sayHelloWorld() {
    alert("hello wolrd");
}

function getProject() {
    app.enableQE();
    return JSON.stringify(app.project);
}

function encodeAllVideoClips() {
    app.enableQE();
    var encoder = app.encoder;
    var clips = _getClips();
    for (var i = 0; i < clips.length; i++) {        
        var clip = clips[i];
        if (clip.mediaType == 'Audio' ) {
            continue;
        }
        var fullOutputPath = '/Users/takky/output/hoge';
        var presetPath = '/Users/takky/Documents/Adobe/Adobe Media Encoder/13.0/Presets/H.264.epr';
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
                    result.push(clip);
                }
            }
        }
    }
    return result;
}

function getClips() {
    var result = _getClips();
    return JSON.stringify(result);
}