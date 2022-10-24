import {
  InMemoryStorage,
  LocalStorage,
  LocalStorageJson,
  SessionStorage,
  SessionStorageJson,
} from "../index.esm.js";

import { isPrimitive, isEmpty, isFunction, isArray } from "locustjs-base";

const equals = function (objA, objB, strict = false) {
  if (isPrimitive(objA) || isEmpty(objA) || isFunction(objA)) {
    return strict
      ? objA === objB
      : objA == objB || (isEmpty(objA) && isEmpty(objB));
  }

  if (isArray(objA)) {
    if (isArray(objB) && objA.length == objB.length) {
      for (let i = 0; i < objA.length; i++) {
        if (!equals(objA[i], objB[i], strict)) {
          return false;
        }
      }

      return true;
    } else {
      return false;
    }
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length != keysB.length) {
    return false;
  }

  for (let key of keysA) {
    if (!equals(objA[key], objB[key], strict)) {
      return false;
    }
  }

  return true;
};

(function (...factoryConfigs) {
  for (let factoryConfig of factoryConfigs) {
    describe("Testing " + factoryConfig.name, () => {
      // --------------------- register -------------------

      test("setItem()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);

          expect(store.length).toBe(1);
        });
      });

      test("clear()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);
          store.setItem("key2", 24);
          store.setItem("key3", 25);

          store.clear();

          expect(store.length).toBe(0);
        });
      });

      test("containsKey()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);
          store.setItem("key2", 24);
          store.setItem("key3", 25);

          expect(store.containsKey("key2")).toBe(true);
          expect(store.containsKey("key6")).toBe(false);
        });
      });

      test("removeItem()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);
          store.setItem("key2", 24);
          store.setItem("key3", 25);

          store.removeItem("key2");

          expect(store.containsKey("key2")).toBe(false);
        });
      });

      test("getItem()", () => {
        expect(() => {
          const store = factoryConfig.factory();
          const value = 23;

          store.setItem("key1", value);
          const fetchedValue = store.getItem("key1");

          expect(fetchedValue).toBe(value);
        });
      });

      test("keyIndex()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);
          store.setItem("key2", 24);
          store.setItem("key3", 25);

          expect(store.keyIndex("key1")).toBe(0);
          expect(store.keyIndex("key2")).toBe(1);
          expect(store.keyIndex("key3")).toBe(2);
        });
      });

      test("key()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);
          store.setItem("key2", 24);
          store.setItem("key3", 25);

          expect(store.key(0)).toBe("key1");
          expect(store.key(1)).toBe("key2");
          expect(store.key(2)).toBe("key3");
        });
      });

      test("keys()", () => {
        expect(() => {
          const store = factoryConfig.factory();

          store.setItem("key1", 23);
          store.setItem("key2", 24);
          store.setItem("key3", 25);

          expect(store.keys.length).toBe(3);
          expect(store.keys[0]).toBe("key1");
        });
      });
    });
  }
})(
  {
    name: "InMemoryStorage",
    factory: function () {
      return new InMemoryStorage();
    },
  },
  {
    name: "LocalStorage",
    factory: function () {
      return new LocalStorage();
    },
  },
  {
    name: "SessionStorage",
    factory: function () {
      return new SessionStorage();
    },
  }
);

(function (...factoryConfigs) {
  for (let factoryConfig of factoryConfigs) {
    describe("Testing " + factoryConfig.name, () => {
      // --------------------- register -------------------

      test("check if items are stored/retrieved in JSON or not", () => {
        expect(() => {
          const store = factoryConfig.factory();
          const value = { name: "John Doe", age: 24, scores: [10, 20, 30] };

          store.setItem("key1", value);

          const fetchedValue = store.getItem("key1");

          expect(typeof fetchedValue).toBe("object");
          expect(equals(value, fetchedValue)).toBe(true);
        });
      });
    });
  }
})(
  {
    name: "LocalStorageJson",
    factory: function () {
      return new LocalStorageJson();
    },
  },
  {
    name: "SessionStorageJson",
    factory: function () {
      return new SessionStorageJson();
    },
  }
);
