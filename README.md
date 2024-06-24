# @locustjs/storage
This library presents storage in an abstract way. It provides an abstract `StorageBase` class and wrappers around `localStorage` and `sessionStorage` as implementations of the base abstract `StorageBase` class.

The aim of the library is loose coupling and decoupling an application dependency on a specific storage.

The abstraction provided by this library enables us to define storages other than `localStorage` or `sessionStorage` that are able to store non-string items.

## Abstraction
### StorageBase

This is the main abstract storage class that defines structure of all storage classes.

#### Public Methods
| method/property | description |
|--------|-------------|
| `getItem(key):any` | Retrieves an item from storage by its key |
| `setItem(key, item):void` | Saves an item in storage by its key |
| `clear():void` | Clears storage and removed all items. |
| `removeItem(key):void` | Removes an item from storage by ites key. |
| `containsKey(key):bool` | Checks whether an item exists in the storage or not. |
| `keyIndex(key):number` | Returns back index of an item in the storage by its key. |
| `key(index):string` | Returns back key of an item at given index. |
| `keys:string[]` | Returns back all items' keys. |

#### Public Properties
| property | type | description |
|--------|---|----------|
| `length` | `number` | Returns the number of items in storage. |

#### Protected Methods
Sub-classes should override and implement these methods.

| method | description |
|--------|-------------|
| `serialize(item):any` | Should serialize an item in a format suited to current storage. It is called automatically by `setItem()`. Sub-Classes should override this method based on their own business. |
| `deserialize(item):any` | Should deserialize an item stored in the current storage. It is called automatically by `getItem()`. Sub-Classes should override this method based on their own business. |
| `_getItem(key)` | This method should return the actual item stored in the storage by its key. |
| `_setItem(key, value)` | This method should perform the actual saving of given item into the storage by its key. |

Using `serialize/deserialize` methods enables us to define sub-classes to perform operations other than just serializing or deserializing values. For example, we can define classes to automatically `encrypt/decrypt` or `compress/decompress` items in the storage before storing and after retrieving them.

## Implementations
`@locustjs/storage` provides 6 sub-classes for `StorageBase`.

| Sub-Class | Description |
|-----------|-------------|
| `InMemoryStorage` | Uses memory as the storage. |
| `LocalStorage` | This is a wrapper around `window.localStorage`. It works the same as `window.localStorage` but supports only string items. |
| `SessionStorage` | This is a wrapper around `window.sessionStorage`. It works the same as `window.sessionStorage` but supports only string items. |

**Note 1:**
There is also a helper abstract class named `ProxyStorage` that is intended to work with both `window.localStorage` and `window.sessionStorage`.

**Note 2:**
`LocalStorage` and `SessionStorage` classes enables us to support storing items in a format different than the ordinary `string` type such as `JSON`. This is how the two following classes are defined.

| Sub-Class | Description |
|-----------|-------------|
| `LocalStorageJson` | This class derives from `LocalStorage` and by overriding `serialize` and `deserialize` method, supports objects as well and is not limited to store only string values like `localStorage`. It serializes/deserializes items in `JSON` format automatically. |
| `SessionStorageJson` | This class derives from `SessionStorage` and by overriding `serialize` and `deserialize` method, supports objects as well and is not limited to store only string values like `sessionStorage`. It serializes/deserializes items in `JSON` format automatically. |

## Examples
```javascript
const store = new LocalStorageJson();

store.setItem('key1', 'test');  // storing a string
store.setItem('key2', 23);  // storing a number
store.setItem('key3', { name: "John Doe", age: 24 });  // storing an object
store.setItem('key4', [10, 20, 30]);  // storing an array

console.log(store.length);  // 4

console.log(store.containsKey('key2'));    // true
console.log(store.containsKey('key6'));    // false

console.log(store.keyIndex('key3'));    // 2
console.log(store.key(3));    // key4

console.log(store.keys);    // [ "key1", "key2", "key3", "key4" ]

console.log(store.getItem('key1')); // 'test'
console.log(store.getItem('key2')); // 23
console.log(store.getItem('key3')); // { name: "John Doe", age: 24 }
console.log(store.getItem('key4')); // [10, 20, 30]

store.clear();

console.log(store.length);  // 0
```
