import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { sortedColor, baseColor, compareColor } = config.common;
const { largestColor } = config.heapSort;

// create max heap
async function heapify(blocks, length, parentIndex) {
    let container = document.getElementById('container');
    let largest = parentIndex;
    let left = parentIndex * 2 + 1;
    let right = left + 1;

    setColor(largest, largestColor);

    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, 100)
    );

    if (left < length) {
        setColor(left, compareColor);
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        if (getValue(left) > getValue(largest)) {
            setColor(largest, baseColor);
            largest = left;
            setColor(largest, largestColor);
        } else setColor(left, baseColor);
    }

    if (right < length) {
        setColor(right, compareColor);
        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, 100)
        );

        if (getValue(right) > getValue(largest)) {
            setColor(largest, baseColor);
            largest = right;
            setColor(largest, largestColor);
        } else setColor(right, baseColor);
    }

    if (largest !== parentIndex) {
        await swap(blocks[parentIndex], blocks[largest]);
        blocks = container.childNodes;
        setColor(parentIndex, baseColor);

        await heapify(blocks, length, largest);
    } else setColor(largest, baseColor);
    return;
}


/**
 * HeapSort implementation for the visualizer
 * 
 * @param {funciton} callback 
 */
export async function HeapSort(callback) {
    let container = document.getElementById('container');
    let blocks = container.childNodes;
    let length = blocks.length;
    let lastParentNode = Math.floor(length / 2 - 1);
    let lastChild = length - 1;

    while (lastParentNode >= 0) {
        await heapify(blocks, length, lastParentNode);
        lastParentNode--;
    }

    while (lastChild >= 0) {
        await swap(blocks[0], blocks[lastChild]);
        blocks = container.childNodes;
        setColor(lastChild, sortedColor);
        await heapify(blocks, lastChild, 0);
        lastChild--;
    }
    setColor(0, sortedColor);
    if (callback) callback();
    return;
}













