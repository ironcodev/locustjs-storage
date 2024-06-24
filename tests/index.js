import {
  InMemoryStorage,
  LocalStorage,
  LocalStorageJson,
  SessionStorage,
  SessionStorageJson,
} from "../index.esm.js";
import TestRunner from "@locustjs/test";
import { equals } from "@locustjs/base";

const factory1 = () => new LocalStorageJson();
const factory2 = () => new SessionStorageJson();
const factory3 = () => new InMemoryStorage();

const tests = (factory) => [
  [
    "General test",
    function (expect) {
      const store = factory();
      const someObj = { name: "John Doe", age: 24 };
      const someArr = [10, 20, 30];
      
      store.setItem("key1", "test"); // storing a string

      store.setItem("key2", 23); // storing a number
      store.setItem("key3", someObj); // storing an object
      store.setItem("key4", someArr); // storing an array

      expect(store.length).toBe(4);

      expect(store.containsKey("key2")).toBeTrue();
      expect(store.containsKey("key6")).toBeFalse();

      expect(store.keyIndex("key3")).toBe(2);
      expect(store.key(3)).toBe("key4");

      const keys = store.keys;

      expect(keys.length).toBe(4); // [ "key1", "key2", "key3", "key4" ]
      expect(keys[0]).toBe("key1");
      expect(keys[1]).toBe("key2");
      expect(keys[2]).toBe("key3");
      expect(keys[3]).toBe("key4");

      expect(store.getItem("key1")).toBe("test"); // 'test'
      expect(store.getItem("key2")).toBe(23); // 23

      const x = store.getItem("key3");

      expect(JSON.stringify(x) == JSON.stringify(someObj)).toBeTrue();

      const y = store.getItem("key4");
      expect(JSON.stringify(y) == JSON.stringify(someArr)).toBeTrue();

      store.clear();

      expect(store.length).toBe(0); // 0
    },
  ],
  [
    "setItem()",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);

      expect(store.length).toBe(1);
    },
  ],
  [
    "clear()",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);
      store.setItem("key2", 24);
      store.setItem("key3", 25);

      store.clear();

      expect(store.length).toBe(0);
    },
  ],
  [
    "containsKey()",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);
      store.setItem("key2", 24);
      store.setItem("key3", 25);

      expect(store.containsKey("key2")).toBe(true);
      expect(store.containsKey("key6")).toBe(false);
    },
  ],
  [
    "removeItem()",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);
      store.setItem("key2", 24);
      store.setItem("key3", 25);

      store.removeItem("key2");

      expect(store.containsKey("key2")).toBe(false);
    },
  ],
  [
    "getItem()",
    (expect) => {
      const store = factory();
      const value = 23;

      store.setItem("key1", value);
      const fetchedValue = store.getItem("key1");

      expect(fetchedValue).toBe(value);
    },
  ],
  [
    "keyIndex()",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);
      store.setItem("key2", 24);
      store.setItem("key3", 25);

      expect(store.keyIndex("key1")).toBe(0);
      expect(store.keyIndex("key2")).toBe(1);
      expect(store.keyIndex("key3")).toBe(2);
    },
  ],
  [
    "key()",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);
      store.setItem("key2", 24);
      store.setItem("key3", 25);

      expect(store.key(0)).toBe("key1");
      expect(store.key(1)).toBe("key2");
      expect(store.key(2)).toBe("key3");
    },
  ],
  [
    "check if items are stored/retrieved in JSON or not",
    (expect) => {
      const store = factory();
      const value = { name: "John Doe", age: 24, scores: [10, 20, 30] };

      store.setItem("key1", value);

      const fetchedValue = store.getItem("key1");

      expect(typeof fetchedValue).toBe("object");
      expect(equals(value, fetchedValue)).toBe(true);
    },
  ],
  [
    "keys",
    (expect) => {
      const store = factory();

      store.setItem("key1", 23);
      store.setItem("key2", 24);
      store.setItem("key3", 25);

      expect(store.keys.length).toBe(3);
      expect(store.keys[0]).toBe("key1");
    },
  ],
];

TestRunner.start([...tests(factory1), ...tests(factory2), ...tests(factory3)]);
