import path from 'path';

export default class Preset {
  constructor(params) {
    this._fullPath = params.fullPath || '';
  }

  static getPresets(basePath) {
    const r =  new RegExp(/.*\.epr$/);
    const files = fs == null ? [] : fs.readdir(basePath).data;
    return files.filter(f => r.test(f) === true).map(f => new Preset({ fullPath: path.join(basePath, f) }));
  }

  /**
   * get preset full path
   * @returns {string}
   */
  get fullPath() { return this._fullPath; }

  set fullPath(value) { this._fullPath = value; }

  /**
   * get preset name
   * @returns {string}
   */
  get name() { return path.basename(this._fullPath); }

  get fs() { return (window.cep &&  window.cep.fs) ? window.cep.fs : null; }
}