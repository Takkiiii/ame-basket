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
    // TODO Specify any location
    var files = new Folder("~/Documents/Adobe/Adobe\ Media\ Encoder/12.0/Presets/").getFiles("*.epr");
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
        if (clips) {
            app.encoder.launchEncoder();
            const workArea = app.encoder.ENCODE_WORKAREA;
            const boolRemoveUponCompletion = 1;
            for (var i = 0; i < indexes.length; i++) {
                var index = indexes[i];
                var clip = clips[index];
                if (clip === null) {
                    alert('clip sis null');
                    continue;
                }
                var fullOutputPath = new File(exportPath.fsName + getSep() + clip.name).fsName;
                alert(clip.projectItem, fullOutputPath, presetPath, workArea, boolRemoveUponCompletion, clip.start, clip.end);
                encoder.encodeProjectItem(clip.projectItem, fullOutputPath, presetPath, workArea, boolRemoveUponCompletion, clip.start, clip.end);
            }
            encoder.startBatch();
        } else {
            alert('No clips not found');
        }
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

function encode(json) {
    // app.encoder.bind('onEncoderJobComplete',	$._PPP_.onEncoderJobComplete);		
	// app.encoder.bind('onEncoderJobError', 		$._PPP_.onEncoderJobError);
	// app.encoder.bind('onEncoderJobProgress', 	$._PPP_.onEncoderJobProgress);
	// app.encoder.bind('onEncoderJobQueued', 		$._PPP_.onEncoderJobQueued);
    // app.encoder.bind('onEncoderJobCanceled',	$._PPP_.onEncoderJobCanceled);
    var outputPresetPath =new File(json.presetPath).fsName;
	var projRoot = app.project.rootItem.children;

	if (projRoot.numItems){
        var children = app.project.rootItem.children;
        alert(children.length);
        if (children.length > 0) {
            app.encoder.launchEncoder();	// This can take a while; let's get the ball rolling.
            for (var i = 0; i < children.length; i++) {
                var firstProjectItem = children[i];
                if (firstProjectItem){
                    var fileOutputPath	= Folder.selectDialog("Choose the output directory");
                    if (fileOutputPath){
                        var outputName	= firstProjectItem.name.search('[.]');
                        if (outputName == -1) {
                            outputName	= firstProjectItem.name.length;
                        }
                        outFileName	= firstProjectItem.name.substr(0, outputName);
                        outFileName	= outFileName.replace('/', '-');
                        var completeOutputPath	= fileOutputPath.fsName + getSep() + outFileName;
                        var removeFromQueue	= true;
                        var rangeToEncode = app.encoder.ENCODE_IN_TO_OUT;
                        app.encoder.encodeProjectItem(firstProjectItem, completeOutputPath, outputPresetPath, rangeToEncode, removeFromQueue); 
                        app.encoder.startBatch();
                    }
                }
            }
        } else {
            alert("No project item found.");
            // $._PPP_.updateEventPanel("No project items found.");
        }
	} else {
        alert("Project is empty.");
	}
}
