function sayHelloWorld() {
    alert("hello wolrd");
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
                    var item = { name: clip.name, trackIndex: ti + 1, mediaType: clip.mediaType, duration: clip.duration };
                    result.push(item);
                }
            }
        }
    }
    return JSON.stringify(result);
}