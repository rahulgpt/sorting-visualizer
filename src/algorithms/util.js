/**
 * Get's the value of bar of specified index
 *  
 * @param {number} index 
 * @returns {number} parsed value of bar 
 */
export const getValue = index => {
    let container = document.getElementById('container');
    let blocks = container.childNodes;
    return Number(blocks[index].childNodes[0].innerHTML);
}

/**
 * Changes the color of bar 
 * 
 * @param {number} index 
 * @param {string} color 
 */
export const setColor = (index, color) => {
    let container = document.getElementById('container');
    let blocks = container.childNodes;
    blocks[index].childNodes[1].style.backgroundColor = color;
}


export const delay = time => {
    return new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, time)
    );
}