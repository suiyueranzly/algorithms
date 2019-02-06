// import visualization libraries {
const { Array1DTracer, Randomize } = require('algorithm-visualizer');
// }

// define tracer variables {
const arrayTracer = new Array1DTracer('Array');
const countsTracer = new Array1DTracer('Counts');
const sortedArrayTracer = new Array1DTracer('Sorted Array');
// }

// define input variables
const N = 20; // the size of an array
const array = new Randomize.Array1D(N, new Randomize.Integer(0, 9)).create();

(function main() {
  // find the maximum value that will decide the size of counts array
  const max = Math.max(...array);
  const counts = new Array(max + 1).fill(0);
  // visualize {
  arrayTracer.set(array);
  countsTracer
    .set(counts)
    .delay();
  // }

  // store counts of each number
  for (let i = 0; i < N; i++) {
    const number = array[i];
    counts[number]++;
    // visualize {
    arrayTracer.select(i);
    countsTracer
      .patch(number, counts[number])
      .delay()
      .depatch(number);
    arrayTracer.deselect(i);
    // }
  }

  // calculate the prefix sums
  for (let i = 1; i <= max; i++) {
    counts[i] += counts[i - 1];
    // visualize {
    countsTracer
      .select(i - 1)
      .patch(i, counts[i])
      .delay()
      .depatch(i)
      .deselect(i - 1);
    // }
  }

  // create a sorted array based on the prefix sums
  const sortedArray = new Array(N);
  // visualize {
  sortedArrayTracer.set(sortedArray);
  // }
  for (let i = N - 1; i >= 0; i--) {
    const number = array[i];
    const count = counts[number];
    sortedArray[count - 1] = number;
    // visualize {
    arrayTracer.select(i);
    countsTracer.select(number);
    sortedArrayTracer
      .patch(count - 1, sortedArray[count - 1])
      .delay()
      .depatch(count - 1);
    countsTracer.deselect(number);
    arrayTracer.deselect(i);
    // }
    counts[number]--;
  }
})();