import { LocalStorageJson } from "../index.esm.js";

function test1() {
  const store = new LocalStorageJson();

  store.setItem("key1", "test"); // storing a string

  store.setItem("key2", 23); // storing a number
  store.setItem("key3", { name: "John Doe", age: 24 }); // storing an object
  store.setItem("key4", [10, 20, 30]); // storing an array

  console.log(store.length); // 4

  console.log(store.containsKey("key2")); // true
  console.log(store.containsKey("key6")); // false

  console.log(store.keyIndex("key3")); // 2
  console.log(store.key(4)); // key4

  console.log(store.keys()); // [ "key1", "key2", "key3", "key4" ]

  console.log(store.getItem("key1")); // 'test'
  console.log(store.getItem("key2")); // 23
  console.log(store.getItem("key3")); // { name: "John Doe", age: 24 }
  console.log(store.getItem("key4")); // [10, 20, 30]

  store.clear();

  console.log(store.length); // 0
}

test1();
