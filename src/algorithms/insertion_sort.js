import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { compareColor, sortedColor } = config.common;

/**
 * Insertion Sort implementation for the visualizer.
 * 
 * @param {function} callback function to call after completion
 * @param {number} delay controls the speed of algorithm
 */
export async function InsertionSort(callback) {
    let container = document.getElementById('container');

    // blocks is the array container a bar and value as elements.
    // Each element in blocks contains a bar(div) and a span(value).
    //
    //               __ value(span)
    //  blocks[0] --|
    //              |__ bar(div)
    //

    let blocks = container.childNodes;

    setColor(0, sortedColor);

    for (let i = 1; i < blocks.length; i++) {
        let currentVal = getValue(i);

        // Create a binding for i because we need to mutate idx
        let idx = i;

        for (var j = i - 1; j >= 0 && getValue(j) > currentVal; j--, idx--) {
            setColor(idx, compareColor);

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );

            await swap(blocks[idx], blocks[j]);

            // We just swapped elements so we need to reset blocks
            blocks = container.childNodes;

            //setColor(idx, prevColor);
            setColor(j, sortedColor);
        }

        // If the array is already sorted 
        if (idx && !(getValue(idx - 1) > currentVal)) {
            setColor(idx, compareColor);

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 100)
            );
        }

        // idx is now in the correct position in the sorted portion.
        setColor(idx, sortedColor);
    }

    // Setting color for the final element
    setColor(blocks.length - 1, sortedColor);
    if (callback) callback();
}