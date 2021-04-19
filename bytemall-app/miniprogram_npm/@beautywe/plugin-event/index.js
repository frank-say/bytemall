module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1619086773012, function(require, module, exports) {


var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var eventSplitter = /\s+/;

var eventsApi = function eventsApi(obj, action, name, rest) {
  if (!name) return true; // Handle event maps.

  if (_typeof(name) === 'object') {
    for (var key in name) {
      obj[action].apply(obj, _toConsumableArray([key, name[key]].concat(rest)));
    }

    return false;
  } // Handle space separated event names.


  if (eventSplitter.test(name)) {
    var names = name.split(eventSplitter);

    for (var i = 0, l = names.length; i < l; i++) {
      obj[action].apply(obj, _toConsumableArray([names[i]].concat(rest)));
    }

    return false;
  }

  return true;
};

var triggerEvents = function triggerEvents(events, args) {
  var ev,
      i = -1,
      l = events.length,
      a1 = args[0],
      a2 = args[1],
      a3 = args[2];

  switch (args.length) {
    case 0:
      while (++i < l) {
        (ev = events[i]).callback.call(ev.ctx);
      }

      return;

    case 1:
      while (++i < l) {
        (ev = events[i]).callback.call(ev.ctx, a1);
      }

      return;

    case 2:
      while (++i < l) {
        (ev = events[i]).callback.call(ev.ctx, a1, a2);
      }

      return;

    case 3:
      while (++i < l) {
        (ev = events[i]).callback.call(ev.ctx, a1, a2, a3);
      }

      return;

    default:
      while (++i < l) {
        (ev = events[i]).callback.apply(ev.ctx, args);
      }

  }
};

var _once = function _once(func) {
  var ran = false,
      memo;
  return function () {
    if (ran) return memo;
    ran = true;
    memo = func.apply(this, arguments);
    func = null;
    return memo;
  };
};

var Events = {
  // Bind an event to a `callback` function. Passing `"all"` will bind
  // the callback to all events fired.
  on: function on(name, callback, context) {
    if (!eventsApi(this.event, 'on', name, [callback, context]) || !callback) return this;
    this._events || (this._events = {});
    var events = this._events[name] || (this._events[name] = []);
    events.push({
      callback: callback,
      context: context,
      ctx: context || this
    });
    return this;
  },
  // Bind an event to only be triggered a single time. After the first time
  // the callback is invoked, it will be removed.
  once: function once(name, callback, context) {
    if (!eventsApi(this.event, 'once', name, [callback, context]) || !callback) return this;
    var self = this;

    var once = _once(function () {
      self.event.off(name, once);
      callback.apply(this, arguments);
    });

    once._callback = callback;
    return this.event.on(name, once, context);
  },
  // Remove one or many callbacks.
  // If `context` is null, removes all callbacks with that function.
  // If `callback` is null, removes all callbacks for the event.
  // If `name` is null, removes all bound callbacks for all events.
  off: function off(name, callback, context) {
    var retain, ev, events, names, i, l, j, k;
    if (!this._events || !eventsApi(this.event, 'off', name, [callback, context])) return this;

    if (!name && !callback && !context) {
      this._events = {};
      return this;
    }

    names = name ? [name] : Object.keys(this._events);

    for (i = 0, l = names.length; i < l; i++) {
      name = names[i]; // eslint-disable-next-line no-cond-assign

      if (events = this._events[name]) {
        this._events[name] = retain = [];

        if (callback || context) {
          for (j = 0, k = events.length; j < k; j++) {
            ev = events[j];

            if (callback && callback !== ev.callback && callback !== ev.callback._callback || context && context !== ev.context) {
              retain.push(ev);
            }
          }
        }

        if (!retain.length) delete this._events[name];
      }
    }

    return this;
  },
  // Trigger one or many events, firing all bound callbacks. Callbacks are
  // passed the same arguments as `trigger` is, apart from the event name
  // (unless you're listening on `"all"`, which will cause your callback to
  // receive the true name of the event as the first argument).
  trigger: function trigger(name) {
    if (!this._events) return this;
    var args = [].slice.call(arguments, 1);
    if (!eventsApi(this, 'trigger', name, args)) return this;
    var events = this._events[name];
    var allEvents = this._events.all;
    if (events) triggerEvents(events, args);
    if (allEvents) triggerEvents(allEvents, arguments);
    return this;
  }
};

module.exports = function event() {
  return {
    name: 'event',
    npmName: _package["default"].name,
    version: _package["default"].version,
    customMethod: Events
  };
};
}, function(modId) {var map = {"../package.json":1619086773013}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773013, function(require, module, exports) {
module.exports = {
  "name": "@beautywe/plugin-event",
  "version": "1.0.1",
  "description": "Event plugin for beautywe",
  "main": "dist/event.js",
  "scripts": {
    "test": "nyc ava test/**/*.test.js",
    "test:report": "nyc report --reporter=html",
    "test:coverage": "nyc --reporter=html ava",
    "build:pro": "rm -rf ./dist && node_modules/.bin/babel src -d dist",
    "build:watch": "babel src --watch -d dist",
    "code-check": "eslint src/**",
    "code-fix": "eslint --fix src/**",
    "lint": "git diff --cached --name-only | grep -E '\\.(js|jsx)$' | xargs eslint",
    "commitmsg": "validate-commit-msg",
    "commit": "git cz"
  },
  "keywords": [
    "beautywe",
    "beautywe-plugin"
  ],
  "author": "JerryC8080 (huangjerryc@gmail.com)",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/beautywe/beautywe-plugin-event.git"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/beautywe/beautywe-plugin-event/issues"
  },
  "homepage": "https://github.com/beautywe/beautywe-plugin-event#readme",
  "devDependencies": {
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/register": "^7.4.0",
    "@beautywe/core": "^1.0.0",
    "ava": "^1.4.1",
    "babel-eslint": "^9.0.0",
    "babel-plugin-array-includes": "^2.0.3",
    "babel-plugin-istanbul": "^5.1.0",
    "commitizen": "^3.0.5",
    "eslint": "^2.13.1",
    "eslint-config-airbnb": "^9.0.1",
    "eslint-plugin-import": "^1.12.0",
    "eslint-plugin-jsx-a11y": "^2.0.1",
    "eslint-plugin-react": "^5.2.2",
    "nyc": "^13.1.0",
    "pre-commit": "^1.2.2",
    "validate-commit-msg": "^2.14.0"
  },
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  },
  "ava": {
    "require": [
      "@babel/register"
    ]
  },
  "nyc": {
    "sourceMap": false,
    "instrument": false
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1619086773012);
})()
//# sourceMappingURL=index.js.map