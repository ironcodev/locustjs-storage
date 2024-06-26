import { isEmpty } from "@locustjs/base";
import {
  throwIfInstantiateAbstract,
  throwNotImplementedException,
} from "@locustjs/exception";

class StorageBase {
  constructor() {
    throwIfInstantiateAbstract(StorageBase, this);

    this._keys = [];
  }
  get length() {
    return this._keys.length;
  }
  serialize(x) {
    return x;
  }
  deserialize(x) {
    return x;
  }
  _getItem(key) {
    throwNotImplementedException("StorageBase._getItem");
  }
  getItem(key) {
    if (isEmpty(key)) {
      return undefined;
    }

    const item = this._getItem(key);
    const result = this.deserialize(item);

    return result;
  }
  _setItem(key, value) {
    throwNotImplementedException("StorageBase._setItem");
  }
  setItem(key, value) {
    if (isEmpty(key)) {
      return;
    }

    const item = this.serialize(value);

    this._setItem(key, item, value);

    this._keys.push(key);
  }
  _removeItem(key) {
    throwNotImplementedException("StorageBase._removeItem");
  }
  removeItem(key) {
    if (isEmpty(key)) {
      return false;
    }
    
    if (this._removeItem(key)) {
      const index = this._keys.indexOf(key);

      this._keys.splice(index, 1);

      return true;
    }

    return false;
  }
  _clear() {
    throwNotImplementedException("StorageBase._clear");
  }
  clear() {
    this._clear();
    this._keys = [];
  }
  containsKey(key) {
    return this.keyIndex(key) >= 0;
  }
  get keys() {
    return [...this._keys];
  }
  key(index) {
    return this._keys[index];
  }
  keyIndex(key) {
    return this._keys.indexOf(key);
  }
}

class InMemoryStorage extends StorageBase {
  constructor() {
    super();

    this._store = {};
  }
  _getItem(key) {
    return this._store[key];
  }
  _setItem(key, value) {
    this._store[key] = value;
  }
  _removeItem(key) {
    if (this._store.hasOwnProperty(key)) {
      delete this._store[key];

      return true;
    }

    return false;
  }
  _clear() {
    this._store = {};
  }
}

class ProxyStorage extends StorageBase {
  constructor(store) {
    super();

    this._store = store;
  }
  get store() {
    return this._store;
  }
  _getItem(key) {
    if (this._store) {
      return this._store.getItem(key);
    }
  }
  _setItem(key, value) {
    if (this._store) {
      return this._store.setItem(key, value);
    }
  }
  _removeItem(key) {
    return this._store.removeItem(key);
  }
  _clear() {
    if (this._store) {
      this._store.clear();
    }
  }
}

class LocalStorage extends ProxyStorage {
  constructor() {
    let store = typeof window == "undefined" ? null : window.localStorage;

    if (!store) {
      console.warn(
        `WARNING LocalStorage.ctor(): window or window.localStorage is undefined. switched to InMemoryStorage()`
      );
      store = new InMemoryStorage();
    }

    super(store);
  }
}

class SessionStorage extends ProxyStorage {
  constructor() {
    let store = typeof window == "undefined" ? null : window.sessionStorage;

    if (!store) {
      console.warn(
        `WARNING SessionStorage.ctor(): window or window.sessionStorage is undefined. switched to InMemoryStorage()`
      );
      store = new InMemoryStorage();
    }

    super(store);
  }
}

class LocalStorageJson extends LocalStorage {
  serialize(x) {
    return JSON.stringify(x);
  }
  deserialize(x) {
    try {
      return JSON.parse(x);
    } catch {
      return undefined;
    }
  }
}

class SessionStorageJson extends SessionStorage {
  serialize(x) {
    return JSON.stringify(x);
  }
  deserialize(x) {
    try {
      return JSON.parse(x);
    } catch {
      return undefined;
    }
  }
}

export {
  StorageBase,
  InMemoryStorage,
  ProxyStorage,
  LocalStorage,
  SessionStorage,
  LocalStorageJson,
  SessionStorageJson,
};
