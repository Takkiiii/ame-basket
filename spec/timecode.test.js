import timecode from 'models/timecode.js';

describe('timecode', () => {
  it('sample test', () => {
    var tc = timecode.createFromSeconds(1.0, 30.0, true);
    expect(tc.toString()).toBe("00:00:01:00");
  });
});