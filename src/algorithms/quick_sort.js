// TODO 
// This implementation is not working correctly and is not final

import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { sortedColor, baseColor } = config.common;
const { pivotColor } = config.quickSort;

async function pivot(blocks, start = 0, end = blocks.length) {
    let container = document.getElementById('container');

    let pivot = getValue(start);
    let swapIdx = start;
    let value;

    setColor(start, pivotColor);

    for (let i = start + 1; i < blocks.length; i++) {
        value = getValue(i);

        setColor(i, 'blue');

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        if (pivot > value) {
            swapIdx++;
            await swap(blocks[swapIdx], blocks[i])
            blocks = container.childNodes;
        }

        setColor(i, baseColor);
    }

    await swap(blocks[start], blocks[swapIdx]);
    blocks = container.childNodes;
    setColor(start, sortedColor);
    return swapIdx;
}

export async function QuickSort(blocks, left = 0, right = blocks.length - 1, callback) {
    if (left < right) {
        let pivotIndex = await pivot(blocks, left, right);
        //left
        QuickSort(blocks, left, pivotIndex - 1);
        //right
        QuickSort(blocks, pivotIndex + 1, right);
    } else {
        //if (callback) callback();
    }
}




