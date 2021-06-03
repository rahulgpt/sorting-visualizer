import { config } from '../app_config';

const { compareColor, sortedColor, previousColor } = config;

async function pivot(container, start = 0, end = container.childNodes.length - 1) {
    let blocks = container.childNodes;

    let pivot = Number(blocks[start].childNodes[0].innerHTML);
    let swapIdx = start;
    let value;

    blocks[start].childNodes[1].style.backgroundColor = compareColor;

    for (let i = start + 1; i <= end; i++) {
        value = Number(blocks[i].childNodes[0].innerHTML);

        if (pivot > value) {
            swapIdx++;
            //swap(arr, swapIdx, i);
            await swap(blocks[swapIdx], blocks[i], container)
        }
    }

    await swap(blocks[start], blocks[swapIdx], container);
    console.log('finalswap')
    return swapIdx;
}

export async function QuickSort(container, left = 0, right = container.childNodes.length - 1) {
    if (left < right) {
        let pivotIndex = pivot(container, left, right);
        //left
        QuickSort(container, left, pivotIndex - 1);
        //right
        QuickSort(container, pivotIndex + 1, right);
    }
}

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