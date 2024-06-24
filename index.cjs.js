"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StorageBase = exports.SessionStorageJson = exports.SessionStorage = exports.ProxyStorage = exports.LocalStorageJson = exports.LocalStorage = exports.InMemoryStorage = void 0;
var _base = require("@locustjs/base");
var _exception = require("@locustjs/exception");
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var StorageBase = exports.StorageBase = /*#__PURE__*/function () {
  function StorageBase() {
    _classCallCheck(this, StorageBase);
    (0, _exception.throwIfInstantiateAbstract)(StorageBase, this);
    this._keys = [];
  }
  return _createClass(StorageBase, [{
    key: "length",
    get: function get() {
      return this._keys.length;
    }
  }, {
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
      (0, _exception.throwNotImplementedException)("StorageBase._getItem");
    }
  }, {
    key: "getItem",
    value: function getItem(key) {
      if ((0, _base.isEmpty)(key)) {
        return undefined;
      }
      var item = this._getItem(key);
      var result = this.deserialize(item);
      return result;
    }
  }, {
    key: "_setItem",
    value: function _setItem(key, value) {
      (0, _exception.throwNotImplementedException)("StorageBase._setItem");
    }
  }, {
    key: "setItem",
    value: function setItem(key, value) {
      if ((0, _base.isEmpty)(key)) {
        return;
      }
      var item = this.serialize(value);
      this._setItem(key, item, value);
      this._keys.push(key);
    }
  }, {
    key: "_removeItem",
    value: function _removeItem(key) {
      (0, _exception.throwNotImplementedException)("StorageBase._removeItem");
    }
  }, {
    key: "removeItem",
    value: function removeItem(key) {
      if ((0, _base.isEmpty)(key)) {
        return false;
      }
      if (this._removeItem(key)) {
        var index = this._keys.indexOf(key);
        this._keys.splice(index, 1);
        return true;
      }
      return false;
    }
  }, {
    key: "_clear",
    value: function _clear() {
      (0, _exception.throwNotImplementedException)("StorageBase._clear");
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
    get: function get() {
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
  }]);
}();
var InMemoryStorage = exports.InMemoryStorage = /*#__PURE__*/function (_StorageBase) {
  function InMemoryStorage() {
    var _this;
    _classCallCheck(this, InMemoryStorage);
    _this = _callSuper(this, InMemoryStorage);
    _this._store = {};
    return _this;
  }
  _inherits(InMemoryStorage, _StorageBase);
  return _createClass(InMemoryStorage, [{
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
}(StorageBase);
var ProxyStorage = exports.ProxyStorage = /*#__PURE__*/function (_StorageBase2) {
  function ProxyStorage(store) {
    var _this2;
    _classCallCheck(this, ProxyStorage);
    _this2 = _callSuper(this, ProxyStorage);
    _this2._store = store;
    return _this2;
  }
  _inherits(ProxyStorage, _StorageBase2);
  return _createClass(ProxyStorage, [{
    key: "store",
    get: function get() {
      return this._store;
    }
  }, {
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
      return this._store.removeItem(key);
    }
  }, {
    key: "_clear",
    value: function _clear() {
      if (this._store) {
        this._store.clear();
      }
    }
  }]);
}(StorageBase);
var LocalStorage = exports.LocalStorage = /*#__PURE__*/function (_ProxyStorage) {
  function LocalStorage() {
    _classCallCheck(this, LocalStorage);
    var store = typeof window == "undefined" ? null : window.localStorage;
    if (!store) {
      console.warn("WARNING LocalStorage.ctor(): window or window.localStorage is undefined. switched to InMemoryStorage()");
      store = new InMemoryStorage();
    }
    return _callSuper(this, LocalStorage, [store]);
  }
  _inherits(LocalStorage, _ProxyStorage);
  return _createClass(LocalStorage);
}(ProxyStorage);
var SessionStorage = exports.SessionStorage = /*#__PURE__*/function (_ProxyStorage2) {
  function SessionStorage() {
    _classCallCheck(this, SessionStorage);
    var store = typeof window == "undefined" ? null : window.sessionStorage;
    if (!store) {
      console.warn("WARNING SessionStorage.ctor(): window or window.sessionStorage is undefined. switched to InMemoryStorage()");
      store = new InMemoryStorage();
    }
    return _callSuper(this, SessionStorage, [store]);
  }
  _inherits(SessionStorage, _ProxyStorage2);
  return _createClass(SessionStorage);
}(ProxyStorage);
var LocalStorageJson = exports.LocalStorageJson = /*#__PURE__*/function (_LocalStorage) {
  function LocalStorageJson() {
    _classCallCheck(this, LocalStorageJson);
    return _callSuper(this, LocalStorageJson, arguments);
  }
  _inherits(LocalStorageJson, _LocalStorage);
  return _createClass(LocalStorageJson, [{
    key: "serialize",
    value: function serialize(x) {
      return JSON.stringify(x);
    }
  }, {
    key: "deserialize",
    value: function deserialize(x) {
      try {
        return JSON.parse(x);
      } catch (_unused) {
        return undefined;
      }
    }
  }]);
}(LocalStorage);
var SessionStorageJson = exports.SessionStorageJson = /*#__PURE__*/function (_SessionStorage) {
  function SessionStorageJson() {
    _classCallCheck(this, SessionStorageJson);
    return _callSuper(this, SessionStorageJson, arguments);
  }
  _inherits(SessionStorageJson, _SessionStorage);
  return _createClass(SessionStorageJson, [{
    key: "serialize",
    value: function serialize(x) {
      return JSON.stringify(x);
    }
  }, {
    key: "deserialize",
    value: function deserialize(x) {
      try {
        return JSON.parse(x);
      } catch (_unused2) {
        return undefined;
      }
    }
  }]);
}(SessionStorage);
