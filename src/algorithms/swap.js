import { config } from '../app_config';

/**
 * Swap the elements by using replaceWith
 * 
 * @param {HTMLElement} el1 div containing bar(div) and span
 * @param {HTMLElement} el2 div containing bar(div) and span
 * @returns 
 */
export default function swap(el1, el2) {
    let tempNode = document.createElement('div');

    return new Promise(resolve => {
        let temp = el1.style.transform;
        el1.style.transform = el2.style.transform;
        el2.style.transform = temp;

        window.requestAnimationFrame(() => {
            setTimeout(() => {
                el1.replaceWith(tempNode);
                el2.replaceWith(el1);
                tempNode.replaceWith(el2);
                resolve();
            }, config.swapDelay);
        })
    })
}
