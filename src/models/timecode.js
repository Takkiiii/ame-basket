export default class Timecode {

  constructor(framerate, isDropframe) {
    this._framerate = framerate;
    this._isDropframe = isDropframe;
  }

  static createFromTotalFrames(totalFrames, framerate, isDropframe) {
    var dropFrames = 0;
    var fps = framerate;
    if (isDropframe) {
      dropFrames = Math.round(fps * 0.066666);
    }

    var roundFrameRate = Math.round(fps);
    var framesPerHour = Math.round(fps * 60 * 60);
    var framesPerDay = framesPerHour * 24;
    var framesPer10Min = Math.round(fps * 60 * 10);
    var framesPerMin = roundFrameRate * 60 - dropFrames;

    var frameNumber = totalFrames;
    if (frameNumber < 0) {
      frameNumber += framesPerDay;
    }

    frameNumber %= framesPerDay;

    if (isDropframe) {
      var d = Math.floor(frameNumber / framesPer10Min);
      var m = frameNumber % framesPer10Min;
      if (m > dropFrames) {
        frameNumber += (dropFrames * 9 * d +
          dropFrames * Math.floor((m - dropFrames) / framesPerMin));
      } else {
        frameNumber += (dropFrames * 9 * d);
      }
    }

    var timecode = new Timecode(framerate, isDropframe);
    timecode.hours = Math.floor(Math.floor(Math.floor(frameNumber / roundFrameRate) / 60.0 /
        60.0)),
      timecode.minutes = Math.floor(Math.floor(frameNumber / roundFrameRate) / 60.0) % 60,
      timecode.seconds = Math.floor(frameNumber / roundFrameRate) % 60,
      timecode.frames = (frameNumber % roundFrameRate)
    return timecode;
  }

  static createFromSeconds(totalSeconds, framerate, isDropframe) {
    const totalFrames = totalSeconds * framerate;
    return this.createFromTotalFrames(totalFrames, framerate, isDropframe);
  }

  toString() {
    return `${('0' + this.hours).slice(-3)}:${('0' + this.minutes).slice(-3)}:${('0' + this.seconds).slice(-3)}${this.isDropframe ? ':' : ';'}${('0' + this.frames).slice(-3)}`;
  }


  get hours() {
    return this._hours;
  }
  set hours(value) {
    this._hours = value;
  }

  get minutes() {
    return this._minites;
  }
  set minutes(value) {
    this._minites = value;
  }

  get seconds() {
    return this._seconds;
  }
  set seconds(value) {
    this._seconds = value;
  }

  get frames() {
    return this._frames;
  }
  set frames(value) {
    this._frames = value;
  }

  get isDropframe() {
    return this._isDropframe;
  }
  set isDropframe(value) {
    this._isDropframe = value;
  }
}