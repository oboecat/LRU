import { LRU } from '../src/LRU';

test('Should create a Cache with default capacity', () => {
  const cache = new LRU();
  expect(cache.capacity).toBe(500);
});

test('Should create a Cache with custom capacity', () => {
  const cache = new LRU(50);
  expect(cache.capacity).toBe(50);
});

test('Should allow get and put operations', () => {
  const cache = new LRU();
  cache.set('hello', 'world');
  expect(cache.get('hello')).toBe('world');
});

test('Size should increment accordingly', () => {
  const cache = new LRU();
  for (let i = 0; i < 15; i++) {
    cache.set(i, i + 1);
  }
});

test('Should kick the last inserted from the cache', () => {
  const cache = new LRU(5);
  for (let i = 0; i < 6; i++) {
    cache.set(i, i);
  }
  expect(cache.get(0)).toBe(null);
});

test('It should not kick the recent used', () => {
  const cache = new LRU(3);
  for (let i = 0; i < 3; i++) {
    cache.set(i, i);
    console.log(cache);
  }

  expect(cache.get(0)).toBe(0);
  console.log(cache);
  cache.set(5, 5);
  console.log(cache);
  expect(cache.get(1)).toBe(null);
});
