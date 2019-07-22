function randomNumbers(count, from = 0, to = 10) {
    const pickedNumbers = new Set();

    while (pickedNumbers.size < count) {
        const pickedNumber = Math.round(Math.random() * (to - from)) + from;
        pickedNumbers.add(pickedNumber);
    }

    return Array.from(pickedNumbers);
}

export function pickRandomItems(array, pickCount) {
    const pickedIndexes = randomNumbers(pickCount, 0, array.length - 1);
    const pickedArray = pickedIndexes.map(index => array[index]);

    return pickedArray;
}

// export function shuffleItems(array) {
//     const shuffledIndexes = randomNumbers(array.length, 0, array.length - 1);
//     const shuffledArray = shuffledIndexes.map(index => array[index]);

//     return shuffledArray;
// }

export function shuffleItems(array) {
    const shuffledArray = [...array];

    for (let i = 0; i < shuffledArray.length - 1; i += 1) {
        const index = randomNumbers(1, i + 1, shuffledArray.length - 1);

        const temp = shuffledArray[i];
        shuffledArray[i] = shuffledArray[index];
        shuffledArray[index] = temp;
    }

    return shuffledArray;
}
