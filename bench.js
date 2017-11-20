const benchmark = require('benchmark')
const LRU = require('./').LRU;

const suite = new benchmark.Suite();

function add(name, fn) {
  suite.add(name, fn);
}

// SET
const lru1 = new LRU(1000);
let lru1Counter = 0;

add('set', function () {
  lru1.set('key' + (lru1Counter++), 'value');
})

// GET
const lru2 = new LRU(1000);
let lru2Counter = 0;

for (var i = 0; i < 1000; i++) {
  lru2.set('key' + i, 'value')
}

add('get', function () {
  lru2.get('key' + (lru2Counter++) % 1000);
});


suite
  .on('cycle', (event) => {
    console.log(String(event.target))
    if (event.target.error) {
      console.error(event.target.error)
    }
  })
  .run();