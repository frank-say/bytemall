module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1619086773005, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "BtApp", {
  enumerable: true,
  get: function get() {
    return _btApp["default"];
  }
});
Object.defineProperty(exports, "BtPage", {
  enumerable: true,
  get: function get() {
    return _btPage["default"];
  }
});
Object.defineProperty(exports, "BtPlugin", {
  enumerable: true,
  get: function get() {
    return _btPlugin["default"];
  }
});
Object.defineProperty(exports, "Host", {
  enumerable: true,
  get: function get() {
    return _host["default"];
  }
});
Object.defineProperty(exports, "error", {
  enumerable: true,
  get: function get() {
    return _error["default"];
  }
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function get() {
    return _logger.Logger;
  }
});
exports["default"] = void 0;

var _btApp = _interopRequireDefault(require("./class/bt-app"));

var _btPage = _interopRequireDefault(require("./class/bt-page"));

var _btPlugin = _interopRequireDefault(require("./class/bt-plugin"));

var _host = _interopRequireDefault(require("./class/host"));

var _error = _interopRequireDefault(require("./lib/error"));

var _logger = require("./lib/logger");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  BtApp: _btApp["default"],
  BtPage: _btPage["default"],
  BtPlugin: _btPlugin["default"],
  error: _error["default"],
  Logger: _logger.Logger,
  Host: _host["default"]
};
exports["default"] = _default;
}, function(modId) {var map = {"./class/bt-app":1619086773006,"./class/bt-page":1619086773011,"./class/bt-plugin":1619086773009,"./class/host":1619086773007,"./lib/error":1619086773010,"./lib/logger":1619086773008}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773006, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./host"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NATIVE_HOOKS = [// 保持第 0 位，为启动钩子
'onLaunch', 'onShow', 'onHide', // onError 不能监听，发生错误的时候，会发生死循环。
// 'onError',
'onPageNotFound'];

var BtApp =
/*#__PURE__*/
function (_Host) {
  _inherits(BtApp, _Host);

  function BtApp(content) {
    var _this;

    _classCallCheck(this, BtApp);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BtApp).call(this, {
      nativeHookNames: NATIVE_HOOKS,
      launchHookName: NATIVE_HOOKS[0]
    }));

    if (content) {
      Object.keys(content).forEach(function (key) {
        if (NATIVE_HOOKS.indexOf(key) !== -1) {
          // register native hook function
          if (typeof content[key] === 'function') {
            _this.pushHookFun(key, content[key]);
          }
        } else {
          // protected domain check
          if (_this[key] !== undefined) {
            throw new Error("you can't use protected domain: ".concat(key, " at BtApp"));
          }

          _this[key] = content[key];
        }
      });
    }

    return _this;
  }

  return BtApp;
}(_host["default"]);

var _default = BtApp;
exports["default"] = _default;
}, function(modId) { var map = {"./host":1619086773007}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773007, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _logger = _interopRequireDefault(require("../lib/logger"));

var _btPlugin = _interopRequireDefault(require("./bt-plugin"));

var _error = _interopRequireDefault(require("../lib/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * 计算需要依赖的但并没有引入的 plugins
 * @param {Host} options.theHost
 * @param {Array} options.relyOn
 */
function getNotIncludedPlugins(_ref) {
  var theHost = _ref.theHost,
      relyOn = _ref.relyOn;
  var thePluginsWasNotIncluded = [];

  function wasIncluded(relyConf, plugin) {
    var nameEqual = plugin.name === relyConf.name;
    var npmNameEqual = relyConf.npmName ? relyConf.npmName === plugin.npmName : true;
    var versionEqual = relyConf.version ? relyConf.version === plugin.version : true;
    return nameEqual && npmNameEqual && versionEqual;
  }

  if (theHost._btPlugin.plugins) {
    relyOn.forEach(function (rely) {
      var relyConf = rely;
      if (typeof rely === 'string') relyConf = {
        name: rely
      };
      thePluginsWasNotIncluded.push(relyConf);

      theHost._btPlugin.plugins.forEach(function (plugin) {
        if (wasIncluded(relyConf, plugin)) {
          thePluginsWasNotIncluded.pop();
        }
      });
    });
  }

  return thePluginsWasNotIncluded;
}
/**
 * 按循序执行 Promise 任务
 * @param {Array} options.tasks 要执行的任务队列
 * @param {Host} options.thisIns 宿主实例
 * @param {*} options.arg 透传的参数
 */


function sequenceTasks(_ref2) {
  var tasks = _ref2.tasks,
      thisIns = _ref2.thisIns,
      arg = _ref2.arg;

  function recordValue(results, value) {
    results.push(value);
    return results;
  }

  var pushValue = recordValue.bind(null, []);
  return tasks.reduce(function (promise, task) {
    return promise.then(function () {
      return task.apply(thisIns, arg);
    }).then(pushValue);
  }, Promise.resolve());
}
/**
 * 绑定 theHost 到 funcs 下的所有方法的 this
 * @param {Host} theHost
 * @param {Object} funs
 */


function deepBind(_ref3) {
  var theHost = _ref3.theHost,
      funs = _ref3.funs,
      domain = _ref3.domain;
  var result = {};
  if (domain) result[domain] = {};
  Object.keys(funs).forEach(function (funName) {
    var fun = funs[funName];
    if (fun === undefined) return; // 如果当前 value 是 object，递归。

    if (!Array.isArray(fun) && fun !== null && _typeof(fun) === 'object') {
      if (domain) result[domain][funName] = deepBind({
        theHost: theHost,
        funs: fun
      });else result[funName] = deepBind({
        theHost: theHost,
        funs: fun
      });
    } // 如果当前 value 是 function，则 bind this with theHost


    if (typeof fun === 'function') {
      if (domain) result[domain][funName] = fun.bind(theHost);else result[funName] = fun.bind(theHost);
    }
  });
  return result;
}
/**
 * 钩子函数可插件化
 * 1. 对 native Hook 可插件化
 * 2. 对 handler Hook 可插件化
 * @param {String} theHost
 * @param {String} funName
 */


function hookFunPluggablify(_ref4) {
  var theHost = _ref4.theHost,
      funName = _ref4.funName,
      beforeCall = _ref4.beforeCall;
  // initializeize function queue (overwrite pluggabled function)
  theHost.newHookFunQueue(funName); // 避免重复改造，造成无限递归

  if (theHost[funName] && theHost[funName].isPluggableHookFun) {
    _logger["default"].warn("hook function(".concat(funName, ") has been pluggabled, do not allow repetition."));

    return;
  } // 标记 isPluggableHookFun，避免重复改造，造成无限递归。


  theHost[funName] = Object.defineProperty(function pluggableHookFun() {
    var _theHost = this;

    if (typeof beforeCall === 'function') beforeCall({
      theHost: _theHost
    });

    var funQueue = _theHost.getHookFunQueue(funName); // 如果不存在，则 resolve


    if (!funQueue || !Array.isArray(funQueue)) return Promise.resolve(); // 以 「先进先出」 的形式按顺序执行 Promise 链，未捕捉的错误，扔到 onError 去。

    for (var _len = arguments.length, arg = new Array(_len), _key = 0; _key < _len; _key++) {
      arg[_key] = arguments[_key];
    }

    return sequenceTasks({
      tasks: funQueue,
      thisIns: _theHost,
      arg: arg
    })["catch"](function (err) {
      if (typeof _theHost.onError === 'function') {
        _theHost.onError(err);
      }

      throw err;
    });
  }, 'isPluggableHookFun', {
    value: true
  });
}
/**
 * 插入一个 plugin
 * @param {Host} theHost
 * @param {BtPlugin} plugin
 */


function attachPlugin(_ref5) {
  var theHost = _ref5.theHost,
      plugin = _ref5.plugin;
  // check domain conflict
  if (!theHost.data) theHost.data = {};
  if (theHost.data[plugin.name]) throw new _error["default"]("theHost.data.".concat(plugin.name, " \u547D\u540D\u7A7A\u95F4\u88AB\u5360\u7528\u4E86\uFF0C\u63D2\u4EF6 ").concat(plugin.name, " \u9700\u8981\u7528\u5230\u8BE5\u547D\u540D\u7A7A\u95F4\uFF0C\u4F60\u53EF\u4EE5\u66F4\u6539\u63D2\u4EF6\u540D\uFF08plugin.name = xxx\uFF09\u6216\u8005\u624B\u52A8\u66F4\u6539\u5BBF\u4E3B data \u90E8\u5206\u6765\u5904\u7406\u51B2\u7A81"));
  if (theHost[plugin.name]) throw new _error["default"]("theHost.".concat(plugin.name, " \u547D\u540D\u7A7A\u95F4\u88AB\u5360\u7528\u4E86\uFF0C\u63D2\u4EF6 ").concat(plugin.name, " \u9700\u8981\u7528\u5230\u8BE5\u547D\u540D\u7A7A\u95F4\uFF0C\u4F60\u53EF\u4EE5\u66F4\u6539\u63D2\u4EF6\u540D\uFF08plugin.name = xxx\uFF09\u6216\u8005\u624B\u52A8\u5904\u7406\u51B2\u7A81")); // attach data

  if (plugin.content.data) {
    theHost.data[plugin.name] = plugin.content.data;
  } // attach custom method


  if (plugin.content.custom) {
    theHost.pushInitFun(function (_ref6) {
      var _theHost = _ref6.theHost;
      Object.assign(_theHost, deepBind({
        theHost: _theHost,
        funs: plugin.content.custom,
        domain: plugin.name
      }));
    });
  } // attach native hook


  if (plugin.content.nativeHook) {
    var nativeHooks = plugin.content.nativeHook;
    Object.keys(nativeHooks).forEach(function (funName) {
      if (typeof nativeHooks[funName] !== 'function') {
        _logger["default"].warn("nativeHook attach fail\uFF0Cthe native hook(".concat(funName, ") should be a function"));

        return;
      }

      if (!theHost.getHookFunQueue(funName)) {
        _logger["default"].warn("nativeHook attach fail\uFF0Cthe native hook(".concat(funName, ") not be support on the host"));

        return;
      }

      theHost.pushHookFun(funName, nativeHooks[funName]);
    });
  } // attach handler hook


  if (plugin.content.handler) {
    var handlerHooks = plugin.content.handler;
    Object.keys(handlerHooks).forEach(function (funName) {
      if (theHost._btPlugin.nativeHookNames.indexOf(funName) !== -1) {
        _logger["default"].warn("nativeHook ".concat(funName, " not be allow definded on handler."));

        return;
      }

      if (!theHost.getHookFunQueue(funName)) {
        var originFun;
        if (typeof theHost[funName] === 'function') originFun = theHost[funName];
        hookFunPluggablify({
          theHost: theHost,
          funName: funName
        });
        theHost.pushHookFun(funName, originFun);
      }

      theHost.pushHookFun(funName, handlerHooks[funName]);
    });
  } // attach initialize function


  if (typeof plugin.initialize === 'function') {
    theHost.pushInitFun(plugin.initialize.bind(plugin));
  }
}

var Host =
/*#__PURE__*/
function () {
  /**
   * New a host
   * @param {Array} options.nativeHookNames
   * @param {String} options.launchHookName
   */
  function Host(_ref7) {
    var _this = this;

    var _ref7$nativeHookNames = _ref7.nativeHookNames,
        nativeHookNames = _ref7$nativeHookNames === void 0 ? [] : _ref7$nativeHookNames,
        launchHookName = _ref7.launchHookName;

    _classCallCheck(this, Host);

    _defineProperty(this, "pushHookFun", function (funName, func) {
      _this._btPlugin.pluggableFunQueueMap[funName].push(func);
    });

    _defineProperty(this, "newHookFunQueue", function (funName) {
      _this._btPlugin.pluggableFunQueueMap[funName] = [];
    });

    _defineProperty(this, "getHookFunQueue", function (funName) {
      return _this._btPlugin.pluggableFunQueueMap[funName];
    });

    _defineProperty(this, "pushInitFun", function (func) {
      _this._btPlugin.pluginsInitializeQueue.push(func);
    });

    _defineProperty(this, "getInitFunQueue", function () {
      return _this._btPlugin.pluginsInitializeQueue;
    });

    // new a domain space
    this._btPlugin = {
      nativeHookNames: nativeHookNames,
      // 存放 attached plugin info
      plugins: [],
      // 存放插件化的函数队列（native hook & handler hook）
      // （这个队列里面的方法，会在对应的钩子函数触发的时候被执行，参数：this => theHost，以及原有参数透传）
      pluggableFunQueueMap: {},
      // 存放每个插件的 initialize 方法，
      // （这个队列里面的方法，会在 onLoad,onLaunch 的时候会已同步的形式执行，参数：{ theHost } ）
      pluginsInitializeQueue: []
    };
    nativeHookNames.forEach(function (funName) {
      if (funName === launchHookName) {
        // custom method pluggable
        hookFunPluggablify({
          theHost: _this,
          funName: funName,
          beforeCall: function beforeCall(_ref8) {
            var theHost = _ref8.theHost;
            theHost.getInitFunQueue().forEach(function (task) {
              return task({
                theHost: theHost
              });
            });
          }
        });
      } else {
        // hook function pluggable
        hookFunPluggablify({
          theHost: _this,
          funName: funName
        });
      }
    });
  }
  /**
   * Use Plugin 使用插件
   * @param {object} plugins instance array of class BtPlugin
   * @param {object} plugins[n].name name of plugin
   * @param {object} plugins[n].content content of plugin
   * @param {object} plugins[n].content.data data for the host
   * @param {object} plugins[n].content.handler handler method for the host
   * @param {object} plugins[n].content.nativeHook nativeHook method for the host
   * @param {object} plugins[n].content.customMethod customMethod method for the host
   * @param {object} plugins[n].options options of plugin
   * @param {Array} plugins[n].options.relyOn options of plugin
   * @param {object} plugins[n].beforeAttach 插件装载前的钩子方法，beforeAttach({ theHost })
   * @param {object} plugins[n].attached 插件装载完成的钩子方法，attached({ theHost })
   * @param {object} plugins[n].initialize 初始化方法，会在宿主启动的时候初始化，已同步的形式执行，initialize({ theHost })
   */


  _createClass(Host, [{
    key: "use",
    value: function use(plugins) {
      var _this2 = this;

      var theHost = this;
      var plgs = plugins;
      if (!plgs) throw new Error('params is required'); // compatibel array and object

      if (plgs && !Array.isArray(plgs)) plgs = [plugins];

      var _loop = function _loop(index) {
        // new a BtPlugin instance
        var plugin = new _btPlugin["default"](plgs[index]); // self registerd checking

        if (theHost._btPlugin.plugins.map(function (item) {
          return item.name;
        }).indexOf(plugin.name) !== -1) {
          throw new _error["default"]("".concat(plugin.name, " \u5DF2\u7ECF\u6CE8\u518C\u4E86\uFF0C\u4E0D\u5141\u8BB8\u91CD\u590D\u6CE8\u518C"));
        } // rely on checking


        var relyOn = plugin.options.relyOn;

        if (relyOn && Array.isArray(relyOn)) {
          var thePluginsWasNotIncluded = getNotIncludedPlugins({
            theHost: theHost,
            relyOn: relyOn
          });

          if (thePluginsWasNotIncluded.length > 0) {
            thePluginsWasNotIncluded.forEach(function (need) {
              var message = "\u63D2\u4EF6 ".concat(plugin.name, " \u4F9D\u8D56\u63D2\u4EF6 ").concat(need.name, "\uFF0C\u8BF7\u5148\u6CE8\u518C ").concat(need.name);

              if (need.npmName) {
                var installMessage = need.version ? "".concat(need.npmName, "@").concat(need.version) : "".concat(need.npmName);
                message += ", \u4F60\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u547D\u4EE4\u5B89\u88C5\u5B83 'npm i ".concat(installMessage, "'");
              }

              _logger["default"].error(message);
            });
            throw new _error["default"]("\u6709 ".concat(thePluginsWasNotIncluded.length, " \u4E2A ").concat(plugin.name, " \u7684\u4F9D\u8D56\u63D2\u4EF6\u672A\u9884\u6CE8\u518C"));
          }
        } // record plugin info into this._btPlugin.plugins


        var pluginInfo = {
          name: plugin.name
        };
        if (plugin.npmName) pluginInfo.npmName = plugin.npmName;
        if (plugin.version) pluginInfo.version = plugin.version;

        theHost._btPlugin.plugins.push(pluginInfo); // do plugin beforeAttach hook functions


        if (typeof plugin.beforeAttach === 'function') plugin.beforeAttach({
          theHost: theHost
        }); // attach plugin

        attachPlugin({
          theHost: _this2,
          plugin: plugin
        }); // do plugin attached hook functions

        if (typeof plugin.attached === 'function') plugin.attached({
          theHost: theHost
        });
      };

      for (var index = 0; index < plgs.length; index += 1) {
        _loop(index);
      }
    }
  }]);

  return Host;
}();

var _default = Host;
exports["default"] = _default;
}, function(modId) { var map = {"../lib/logger":1619086773008,"./bt-plugin":1619086773009,"../lib/error":1619086773010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773008, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Logger = exports.logger = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        prefix = _ref.prefix;

    _classCallCheck(this, Logger);

    this.prefix = prefix;
  }

  _createClass(Logger, [{
    key: "warn",
    value: function warn() {
      var _console;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_console = console).warn.apply(_console, ["[".concat(this.prefix, ":waring]")].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      var _console2;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_console2 = console).info.apply(_console2, ["[".concat(this.prefix, ":info]")].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _console3;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (_console3 = console).error.apply(_console3, ["[".concat(this.prefix, ":error]")].concat(args));
    }
  }, {
    key: "debug",
    value: function debug() {
      var _console4;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (_console4 = console).debug.apply(_console4, ["[".concat(this.prefix, ":debug]")].concat(args));
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;
var logger = new Logger({
  prefix: 'BeautyWe'
});
exports.logger = logger;
var _default = logger;
exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773009, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _error = _interopRequireDefault(require("../lib/error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BtPlugin =
/**
 * Crate a BtPlugin instance
 * @param {String} content.name 插件名
 * @param {Function} [content.beforeAttach] 插件装载前的钩子方法，beforeAttach({ theHost })
 * @param {Function} [content.attached] 插件装载完成的钩子方法，attached({ theHost })
 * @param {Function} [content.initialize] 初始化方法，会在宿主启动的时候初始化，已同步的形式执行，initialize({ theHost })
 * @param {Object} [content.data] 可选，混入到宿主的 data 部分
 * @param {Object} [content.customMethod] 可选，混入到宿主的自定义方法
 * @param {Object} [content.nativeHook] 可选，混入到宿主的原生钩子方法
 * @param {Object} [content.handler] 可选，混入到宿主的事件监听函数
 * @param {String} [content.npmName] 可选，插件在 npm 的名字，用来处理插件之间的冲突与依赖问题。
 * @param {String} [content.version] 可选，插件在 npm 的版本号，用来处理插件之间的冲突与依赖问题。
 * @param {Collection|Object|String} [content.relyOn] 用来检查依赖插件，支持 string, object{name, version, npmName}。
 * @param {string} [content.relyOn.npmName] npm 包的名字，可选
 * @param {string} [content.relyOn.version] npm 包的版本号，可选
 */
function BtPlugin() {
  var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, BtPlugin);

  if (!content.name) throw new _error["default"]('params of name are required when create a BtPlugin.');
  this.name = content.name;
  this.npmName = content.npmName;
  this.version = content.version;
  this.content = {
    data: content.data,
    custom: content.customMethod,
    nativeHook: content.nativeHook,
    handler: content.handler
  };
  this.options = {
    relyOn: content.relyOn
  };

  if (typeof content.beforeAttach === 'function') {
    this.beforeAttach = content.beforeAttach.bind(this);
  }

  if (typeof content.attached === 'function') {
    this.attached = content.attached.bind(this);
  }

  if (typeof content.initialize === 'function') {
    this.initialize = content.initialize.bind(this);
  }
};

var _default = BtPlugin;
exports["default"] = _default;
}, function(modId) { var map = {"../lib/error":1619086773010}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773010, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var BtError =
/*#__PURE__*/
function (_Error) {
  _inherits(BtError, _Error);

  function BtError(message) {
    _classCallCheck(this, BtError);

    var _msg = "[BeautyWe:error] ".concat(message);

    return _possibleConstructorReturn(this, _getPrototypeOf(BtError).call(this, _msg));
  }

  return BtError;
}(_wrapNativeSuper(Error));

var _default = BtError;
exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773011, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _host = _interopRequireDefault(require("./host"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var NATIVE_HOOKS = [// 保持第 0 位，为启动钩子
'onLoad', 'onShow', 'onReady', 'onHide', 'onUnload', 'onPullDownRefresh', 'onReachBottom', 'onPageScroll', 'onResize', 'onTabItemTap'];

var BtPage =
/*#__PURE__*/
function (_Host) {
  _inherits(BtPage, _Host);

  function BtPage(content) {
    var _this;

    _classCallCheck(this, BtPage);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BtPage).call(this, {
      nativeHookNames: NATIVE_HOOKS,
      launchHookName: NATIVE_HOOKS[0]
    }));

    if (content) {
      Object.keys(content).forEach(function (key) {
        if (NATIVE_HOOKS.indexOf(key) !== -1) {
          // register native hook function
          if (typeof content[key] === 'function') {
            _this.pushHookFun(key, content[key]);
          }
        } else {
          // protected domain check
          if (_this[key] !== undefined) {
            throw new Error("you can't use protected domain: ".concat(key, " at BtPage"));
          }

          _this[key] = content[key];
        }
      });
    }

    return _this;
  }

  return BtPage;
}(_host["default"]);

var _default = BtPage;
exports["default"] = _default;
}, function(modId) { var map = {"./host":1619086773007}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1619086773005);
})()
//# sourceMappingURL=index.js.map