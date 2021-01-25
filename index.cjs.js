"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionStorageJson = exports.LocalStorageJson = exports.SessionStorage = exports.LocalStorage = exports.ProxyStorage = exports.InMemoryStorage = exports.StorageBase = void 0;

var _locustjsBase = require("locustjs-base");

var _locustjsException = require("locustjs-exception");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var StorageBase = /*#__PURE__*/function () {
  function StorageBase() {
    _classCallCheck(this, StorageBase);

    (0, _locustjsException.throwIfInstantiateAbstract)(StorageBase, this);
    this._keys = [];
  }

  _createClass(StorageBase, [{
    key: "serialize",
    value: function serialize(x) {
      return x;
    }
  }, {
    key: "deserialize",
    value: function deserialize(x) {
      return x;
    }
  }, {
    key: "_getItem",
    value: function _getItem(key) {
      (0, _locustjsException.throwNotImplementedException)('StorageBase._getItem');
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      if ((0, _locustjsBase.isEmpty)(key)) {
        return undefined;
      }

      var item = this._getItem(key);

      var result = this.deserialize(item);
      return result;
    }
  }, {
    key: "_setItem",
    value: function _setItem(key, value) {
      (0, _locustjsException.throwNotImplementedException)('StorageBase._setItem');
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      if ((0, _locustjsBase.isEmpty)(key)) {
        return;
      }

      var item = this.serialize(value);

      this._setItem(key, item, value);

      this._keys.push(key);
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(key) {
      (0, _locustjsException.throwNotImplementedException)('StorageBase._removeItem');
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      if ((0, _locustjsBase.isEmpty)(key)) {
        return;
      }

      if (this._removeItem(key)) {
        var index = this._keys.indexOf(key);

        this._keys.splice(index, 1);
      }
    }
  }, {
    key: "_clear",
    value: function _clear() {
      (0, _locustjsException.throwNotImplementedException)('StorageBase._clear');
    }
  }, {
    key: "clear",
    value: function clear() {
      this._clear();

      this._keys = [];
    }
  }, {
    key: "containsKey",
    value: function containsKey(key) {
      return this.keyIndex(key) >= 0;
    }
  }, {
    key: "keys",
    value: function keys() {
      return _toConsumableArray(this._keys);
    }
  }, {
    key: "key",
    value: function key(index) {
      return this._keys[index];
    }
  }, {
    key: "keyIndex",
    value: function keyIndex(key) {
      return this._keys.indexOf(key);
    }
  }, {
    key: "length",
    get: function get() {
      return this._keys.length;
    }
  }]);

  return StorageBase;
}();

exports.StorageBase = StorageBase;

var InMemoryStorage = /*#__PURE__*/function (_StorageBase) {
  _inherits(InMemoryStorage, _StorageBase);

  var _super = _createSuper(InMemoryStorage);

  function InMemoryStorage() {
    var _this;

    _classCallCheck(this, InMemoryStorage);

    _this = _super.call(this);
    _this._store = {};
    return _this;
  }

  _createClass(InMemoryStorage, [{
    key: "_getItem",
    value: function _getItem(key) {
      return this._store[key];
    }
  }, {
    key: "_setItem",
    value: function _setItem(key, value) {
      this._store[key] = value;
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(key) {
      if (this._store.hasOwnProperty(key)) {
        delete this._store[key];
        return true;
      }

      return false;
    }
  }, {
    key: "_clear",
    value: function _clear() {
      this._store = {};
    }
  }]);

  return InMemoryStorage;
}(StorageBase);

exports.InMemoryStorage = InMemoryStorage;

var ProxyStorage = /*#__PURE__*/function (_StorageBase2) {
  _inherits(ProxyStorage, _StorageBase2);

  var _super2 = _createSuper(ProxyStorage);

  function ProxyStorage(store) {
    var _this2;

    _classCallCheck(this, ProxyStorage);

    _this2 = _super2.call(this);
    _this2._store = store;

    if (store) {
      _this2._keys = Object.keys(_this2._store);
    }

    return _this2;
  }

  _createClass(ProxyStorage, [{
    key: "_getItem",
    value: function _getItem(key) {
      if (this._store) {
        return this._store.getItem(key);
      }
    }
  }, {
    key: "_setItem",
    value: function _setItem(key, value) {
      if (this._store) {
        return this._store.setItem(key, value);
      }
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(key) {
      if (this._store && this._store.hasOwnProperty(key)) {
        this._store.removeItem(key);

        return true;
      }

      return false;
    }
  }, {
    key: "_clear",
    value: function _clear() {
      if (this._store) {
        this._store.clear();
      }
    }
  }]);

  return ProxyStorage;
}(StorageBase);

exports.ProxyStorage = ProxyStorage;

var LocalStorage = /*#__PURE__*/function (_ProxyStorage) {
  _inherits(LocalStorage, _ProxyStorage);

  var _super3 = _createSuper(LocalStorage);

  function LocalStorage() {
    _classCallCheck(this, LocalStorage);

    var store = window && window.localStorage;

    if (!store) {
      store = new InMemoryStorage();
    }

    return _super3.call(this, store);
  }

  return LocalStorage;
}(ProxyStorage);

exports.LocalStorage = LocalStorage;

var SessionStorage = /*#__PURE__*/function (_ProxyStorage2) {
  _inherits(SessionStorage, _ProxyStorage2);

  var _super4 = _createSuper(SessionStorage);

  function SessionStorage() {
    _classCallCheck(this, SessionStorage);

    var store = window && window.sessionStorage;

    if (!store) {
      store = new InMemoryStorage();
    }

    return _super4.call(this, store);
  }

  return SessionStorage;
}(ProxyStorage);

exports.SessionStorage = SessionStorage;

var LocalStorageJson = /*#__PURE__*/function (_LocalStorage) {
  _inherits(LocalStorageJson, _LocalStorage);

  var _super5 = _createSuper(LocalStorageJson);

  function LocalStorageJson() {
    _classCallCheck(this, LocalStorageJson);

    return _super5.apply(this, arguments);
  }

  _createClass(LocalStorageJson, [{
    key: "serialize",
    value: function serialize(x) {
      return JSON.stringify(x);
    }
  }, {
    key: "deserialize",
    value: function deserialize(x) {
      try {
        return JSON.parse(x);
      } catch {
        return undefined;
      }
    }
  }]);

  return LocalStorageJson;
}(LocalStorage);

exports.LocalStorageJson = LocalStorageJson;

var SessionStorageJson = /*#__PURE__*/function (_SessionStorage) {
  _inherits(SessionStorageJson, _SessionStorage);

  var _super6 = _createSuper(SessionStorageJson);

  function SessionStorageJson() {
    _classCallCheck(this, SessionStorageJson);

    return _super6.apply(this, arguments);
  }

  _createClass(SessionStorageJson, [{
    key: "serialize",
    value: function serialize(x) {
      return JSON.stringify(x);
    }
  }, {
    key: "deserialize",
    value: function deserialize(x) {
      try {
        return JSON.parse(x);
      } catch {
        return undefined;
      }
    }
  }]);

  return SessionStorageJson;
}(SessionStorage);

exports.SessionStorageJson = SessionStorageJson;