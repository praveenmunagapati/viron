import { find } from 'mout/array';
import pathToRegexp from 'path-to-regexp';
import createHashHistory from 'history/createHashHistory';

class Router {
  constructor() {
    /**
     * hash history object.
     * @private
     * @type {Object|null}
     */
    this._history = createHashHistory();

    /**
     * routing definitions.
     * @private
     * @type {Array}
     */
    this._routes = [];

    /**
     * function to stop listening for the changes.
     * to stop, just execute this function.
     * @private
     * @type {Function|null}
     */
    this._unlistener = null;
  }

  /**
   * start listening for changes to the current location.
   * @param {Boolean} autoExec to decide whether routing is executed with the current url.
   */
  start(autoExec = true) {
    this._unlistener = this._history.listen((location, action) => {
      this._change(location, action);
    });

    if (autoExec) {
      this._change(this.getCurrentLocation(), this.getCurrentAction());
    }
  }

  /**
   * register a route.
   * @param {String} pattern express-like url pattern.
   * @param {Function} onRoute a function that will be executed when the route changes.
   */
  on(pattern, onChange) {
    this._routes.push({
      pattern,
      regexp: pathToRegexp(pattern),
      onChange
    });
  }

  /**
   * navigate to target location.
   * @param {String|Object} path e.g.) '/foo' or { pathname, search, hash }
   */
  navigateTo(path) {
    this._history.push(path);
  }

  /**
   * returns current location.
   * @return {String}
   */
  getCurrentLocation() {
    return this._history.location;
  }

  /**
   * returns current action.
   * @return {String}
   */
  getCurrentAction() {
    return this._history.action;
  }

  /**
   * fire route enter event.
   * @private
   * @param {Object} location i.e.) history.location
   * @param {String} action i.e.) history.action
   */
  _change(location, action) {
    const route = find(this._routes, route => {
      return !!route.regexp.exec(location.pathname);
    });

    if (!route) {
      return;
    }

    const params = this._parseLocation(location, route);
    route.onChange(...params);
  }

  /**
   * parse location object so riot tag instances can use it with ease.
   * @private
   * @param {Object} location
   * @param {Object} route
   * @return {Object}
   */
  _parseLocation(location, route) {
    return route.regexp.exec(location.pathname).slice(1);
  }
}

export default new Router();
