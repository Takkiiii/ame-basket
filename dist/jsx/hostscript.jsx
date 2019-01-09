function sayHelloWorld() {
    alert("hello wolrd");
}

function getProject() {
    app.enableQE();
    return JSON.stringify(app.project);
}

function encodeClips(clips) {
    app.enableQE();
    var encoder = app.encoder;
    for (var i = 0; i < clips.length; i++) {        
        var clip = clips[i];
        var fullOutputPath = '/Users/takky/output/';
        var presetPath = '/Users/takky/Documents/Adobe/Adobe Media Encoder/13.0/Presets/H.264.epr';
        var workArea = 0;
        var boolRemoveUponCompletion = 1;
        var inPoint = clip.inPoint;
        var outPoint = clip.outPoint;
        encoder.encodeProjectItem(clip.projectItem, fullOutputPath, presetPath, workArea, boolRemoveUponCompletion, inPoint, outPoint);
    }
    encoder.startBatch();
}

function getClips() {
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
    return JSON.stringify(result);
}