module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1619086773014, function(require, module, exports) {


var _status = _interopRequireDefault(require("./status"));

var _package = _interopRequireDefault(require("../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

module.exports = function status() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return {
    name: 'status',
    npmName: _package["default"].name,
    version: _package["default"].version,
    relyOn: [{
      name: 'event',
      npmName: '@beautywe/plugin-event'
    }],
    nativeHook: {
      onLaunch: function onLaunch() {
        this.status.initStatus();
      },
      onLoad: function onLoad() {
        this.status.initStatus();
      }
    },
    customMethod: {
      get: function get(name) {
        return this.status._statuses[name];
      },
      remove: function remove(name) {
        delete this.status._statuses[name];
      },
      add: function add(name) {
        if (!this.status._statuses) this.status._statuses = {};
        if (!this.status._statuses[name]) this.status._statuses[name] = new _status["default"](name, {
          theHost: this
        });
        return this.status._statuses[name];
      },
      initStatus: function initStatus() {
        var _this = this;

        if (options.statuses && Array.isArray(options.statuses)) {
          options.statuses.forEach(function (statusName) {
            return _this.status.add(statusName);
          });
        }
      }
    }
  };
};
}, function(modId) {var map = {"./status":1619086773015,"../package.json":1619086773016}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773015, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = require("@beautywe/core");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var logger = new _core.Logger({
  prefix: 'beautywe-plugin-evet'
});

var Status =
/*#__PURE__*/
function () {
  function Status(name, _ref) {
    var theHost = _ref.theHost;

    _classCallCheck(this, Status);

    this.name = name;
    this.statusVar = {
      FAIL: -1,
      UN_START: 0,
      ING: 1,
      SUCCESS: 2
    };
    this.status = this.statusVar.UN_START;
    this.theHost = theHost;
  } // 改变状态：成功


  _createClass(Status, [{
    key: "success",
    value: function success(params) {
      logger.info('status:success', "\u72B6\u6001\u5668(".concat(this.name, ") \u542F\u52A8\u6210\u529F"));
      this.status = this.statusVar.SUCCESS;
      this.theHost.event.trigger(this.getEventKeyByStatus(this.statusVar.SUCCESS), params);
    } // 改变状态：失败

  }, {
    key: "fail",
    value: function fail(error) {
      logger.info('status:fail', "\u72B6\u6001\u5668(".concat(this.name, ") \u542F\u52A8\u5931\u8D25"));
      this.status = this.statusVar.FAIL;
      this.theHost.event.trigger(this.getEventKeyByStatus(this.statusVar.FAIL), error);
    } // 改变状态：进行中

  }, {
    key: "ing",
    value: function ing() {
      this.status = this.statusVar.ING;
    } // 改变状态：重置

  }, {
    key: "reset",
    value: function reset() {
      this.status = this.statusVar.UN_START;
    } // 一定是成功之后，才会返回。

  }, {
    key: "must",
    value: function must() {
      var _this = this;

      if (this.status === this.statusVar.SUCCESS) return Promise.resolve();
      return Promise.resolve().then(function () {
        return new Promise(function (resolve, reject) {
          _this.theHost.event.once(_this.getEventKeyByStatus(_this.statusVar.SUCCESS), resolve);

          _this.theHost.event.once(_this.getEventKeyByStatus(_this.statusVar.FAIL), reject);
        });
      })["catch"](function (error) {
        // 失败了，打印错误，继续监听下一次状态。
        logger.warn('status:must:fail', "\u72B6\u6001\u5668(".concat(_this.name, ")\u542F\u52A8\u5931\u8D25)"), error);
        return _this.must();
      });
    } // 监听后续的一次成功事件

  }, {
    key: "onceSuccess",
    value: function onceSuccess() {
      var _this2 = this;

      return new Promise(function (resolve) {
        _this2.theHost.event.once(_this2.getEventKeyByStatus(_this2.statusVar.SUCCESS), resolve);
      });
    } // 监听后续的一次失败事件

  }, {
    key: "onceFail",
    value: function onceFail() {
      var _this3 = this;

      return new Promise(function (resolve) {
        _this3.theHost.event.once(_this3.getEventKeyByStatus(_this3.statusVar.FAIL), resolve);
      });
    } // 是否在进行中

  }, {
    key: "isIng",
    value: function isIng() {
      return this.status === this.statusVar.ING;
    } // 是否已经成功

  }, {
    key: "isSuccess",
    value: function isSuccess() {
      return this.status === this.statusVar.SUCCESS;
    } // 是否已经失败

  }, {
    key: "isFail",
    value: function isFail() {
      return this.status === this.statusVar.FAIL;
    } // 获取状态器的 key

  }, {
    key: "getEventKeyByStatus",
    value: function getEventKeyByStatus(status) {
      return "".concat(this.name, ":").concat(status);
    }
  }]);

  return Status;
}();

var _default = Status;
exports["default"] = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1619086773016, function(require, module, exports) {
module.exports = {
  "name": "@beautywe/plugin-status",
  "version": "1.0.0",
  "description": "Status plugin for beautywe",
  "main": "dist/status.plugin.js",
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
  "devDependencies": {
    "@beautywe/plugin-event": "^1.0.0",
    "@babel/register": "^7.4.0",
    "@babel/cli": "^7.0.0",
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
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
  "dependencies": {
    "@beautywe/core": "^1.0.0"
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
  },
  "directories": {
    "test": "test"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/beautywe/plugin-status.git"
  },
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/beautywe/plugin-status/issues"
  },
  "homepage": "https://github.com/beautywe/plugin-status#readme"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1619086773014);
})()
//# sourceMappingURL=index.js.map