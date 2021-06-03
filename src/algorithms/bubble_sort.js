import { config } from '../app_config';

const { compareColor, sortedColor, previousColor } = config;

function swap(el1, el2, container) {
    return new Promise((resolve) => {

        // For exchanging styles of two blocks
        var temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(function () {

            // For waiting for .25 sec
            setTimeout(() => {
                container.insertBefore(el2, el1);
                resolve();
            }, 250);
        });
    });
}

export async function BubbleSort(container, callback, delay = 100) {
    let blocks = container.childNodes;

    // BubbleSort Algorithm
    for (var i = 0; i < blocks.length; i += 1) {
        for (var j = 0; j < blocks.length - i - 1; j += 1) {

            // To change background-color of the
            // blocks to be compared
            blocks[j].childNodes[1].style.backgroundColor = compareColor;
            blocks[j + 1].childNodes[1].style.backgroundColor = compareColor;

            // To wait for .1 sec
            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, delay)
            );

            var value1 = Number(blocks[j].childNodes[0].innerHTML);
            var value2 = Number(blocks[j + 1]
                .childNodes[0].innerHTML);

            // To compare value of two blocks
            if (value1 > value2) {
                await swap(blocks[j], blocks[j + 1], container);
                blocks = container.childNodes;
            }

            // Changing the color to the previous one
            blocks[j].childNodes[1].style.backgroundColor = previousColor;
            blocks[j + 1].childNodes[1].style.backgroundColor = previousColor;
        }

        //changing the color of greatest element
        //found in the above traversal
        blocks[blocks.length - i - 1].childNodes[1]
            .style.backgroundColor = sortedColor;
    }

    if (callback) callback();
}


