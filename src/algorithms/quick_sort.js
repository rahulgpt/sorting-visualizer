import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { sortedColor, baseColor, compareColor } = config.common;
const { pivotColor, lessThanColor } = config.quickSort;

/**
 * Pivot helper function for QuickSort.
 * 
 * @param {HTMLElement[]} blocks 
 * @param {number} start 
 * @param {number} end 
 * @returns {number} pivotIndex
 */
async function pivot(blocks, start = 0, end = blocks.length + 1) {
    let container = document.getElementById('container');

    let pivot = getValue(start);
    let swapIdx = start;
    let value;

    setColor(swapIdx, pivotColor);

    for (let i = start + 1; i <= end; i++) {
        value = getValue(i);

        setColor(i, compareColor);

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        if (pivot > value) {
            swapIdx++;
            setColor(i, lessThanColor)
            if (swapIdx !== i) {
                await swap(blocks[swapIdx], blocks[i]);
                blocks = container.childNodes;
            }
        }
        else setColor(i, baseColor);
    }

    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 100)
    );

    await swap(blocks[start], blocks[swapIdx]);
    blocks = container.childNodes;
    setColor(swapIdx, sortedColor);

    for (let j = start + 1; j < swapIdx; j++) {
        setColor(j, baseColor);
    }

    return swapIdx;
}

/**
 * Quick Sort(iterative) implementation for the visualizer
 * 
 * @param {function} callback 
 */
export async function QuickSort(callback) {
    let blocks = document.getElementById('container').childNodes;

    let stack = [];
    stack.push({ left: 0, right: blocks.length - 1 });

    while (stack.length) {
        const { left, right } = stack.pop();
        let pivotIndex = await pivot(blocks, left, right);
        if (pivotIndex - 1 > left) stack.push({ left, right: pivotIndex - 1 });
        else setColor(left, sortedColor);
        if (pivotIndex + 1 < right) stack.push({ left: pivotIndex + 1, right });
        else setColor(right, sortedColor);
    }
    if (callback) callback();
}




