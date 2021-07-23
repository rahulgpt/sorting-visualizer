import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { compareColor, sortedColor, baseColor } = config.common;

/**
 * Bubble sort implementation for the visualizer.
 * 
 * @param {function} callback function to call after completion
 * @param {number} delay controls to speed of algorithm
 */
export async function BubbleSort(callback, delay = 100) {
    let container = document.getElementById('container');

    // blocks is the array container a bar and value as elements.
    // Each element in blocks contains a bar(div) and a span(value).
    //
    //               __ value(span)
    //  blocks[0] --|
    //              |__ bar(div)
    //
    let blocks = container.childNodes;
    let noSwap;

    for (var i = 0; i < blocks.length; i += 1) {
        noSwap = true;
        for (var j = 0; j < blocks.length - i - 1; j += 1) {

            setColor(j, compareColor);
            setColor(j + 1, compareColor);

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            var value1 = getValue(j);
            var value2 = getValue(j + 1);

            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1], container);
                noSwap = false;
                blocks = container.childNodes;
            }

            setColor(j, baseColor);
            setColor(j + 1, baseColor);
        }

        if (noSwap) {
            // For already sorted array
            for (let i = 0; i < blocks.length; i++) {
                setColor(i, sortedColor);
            }
            break;
        }
        else {
            // Last element is now sorted
            setColor(blocks.length - i - 1, sortedColor);
        }
    }

    if (callback) callback();
}


