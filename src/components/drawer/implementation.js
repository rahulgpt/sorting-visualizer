export const bubble = `
function bubbleSort(arr) {
  const swap = (arr, i1, i2) => 
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];

  let noSwaps;

  for (let i = arr.length; i > 0; i--) {
      noSwaps = true
      for (let j = 0; j < i - 1; j++) {
          if (arr[j] > arr[j + 1]) {
              swap(arr, j, j + 1);
              noSwaps = false;
          }
      }
      if (noSwaps) break;
  }
  return arr;
}
`;

export const selection = `
function selectionSort(arr) {
  const swap = (arr, i1, i2) => 
    [arr[i1], arr[i2]] = [arr[i2], arr[i1]];

  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) lowest = j;
    }
    if (i !== lowest) {
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
    }
  }
  return arr;
}
`;

export const insertion = `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let current = arr[i];
    for (var j = i - 1; j >= 0 && arr[j] > current; j--) {
      arr[j + 1] = arr[j];
    }
    arr[j + 1] = current;
  }
  return arr;
}
`;

export const quick = `
function pivot(arr, start = 0, end = arr.length - 1) {
  const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
  };

  let pivot = arr[start];
  let swapIdx = start;

  for (let i = start + 1; i <= end; i++) {
    if (pivot > arr[i]) {
      swapIdx++;
      swap(arr, swapIdx, i);
    }
  }

  swap(arr, start, swapIdx);
  console.log(swapIdx);
  return swapIdx;
}

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    let pivotIndex = pivot(arr, left, right);
    //left
    quickSort(arr, left, pivotIndex - 1);
    //right
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}
`;
