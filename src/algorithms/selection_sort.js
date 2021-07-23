import { config } from '../app_config';
import swap from './swap';
import { getValue, setColor } from './util';

const { lowestColor } = config.selectionSort;
const { compareColor, baseColor, sortedColor } = config.common;

/**
 * Selection sort for the visualizer.
 * 
 * @param {function} callback function to call after completion
 * @param {number} delay controls the speed of algorithm
 */
export async function SelectionSort(callback, delay = 100) {
    let container = document.getElementById('container');

    // blocks is the array container a bar and value as elements.
    // Each element in blocks contains a bar(div) and a span(value).
    //
    //               __ value(span)
    //  blocks[0] --|
    //              |__ bar(div)
    //
    let blocks = container.childNodes;

    for (let i = 0; i < blocks.length; i++) {
        let lowest = i;

        setColor(i, lowest === i ? lowestColor : compareColor);

        for (let j = i + 1; j < blocks.length; j++) {
            setColor(j, compareColor);

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );
            let value1 = getValue(j);
            let value2 = getValue(lowest);

            if (value1 < value2) {
                setColor(lowest, baseColor);
                lowest = j;
                setColor(lowest, lowestColor);
            }

            if (j !== lowest) setColor(j, baseColor);
        }
        if (i !== lowest) {
            await swap(blocks[i], blocks[lowest]);

            blocks = container.childNodes;
        }
        // lowest element is now sorted
        setColor(i, sortedColor);
    }
    if (callback) callback();
}