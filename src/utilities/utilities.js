export const getRandomItems = (array, count) => {
    const shuffled = array.slice();
    let currentIndex = array.length;
    let randomIndex, temp;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        temp = shuffled[currentIndex];
        shuffled[currentIndex] = shuffled[randomIndex];
        shuffled[randomIndex] = temp;
    }

    return shuffled.slice(0, count);
}

export const removeDuplicates = (array) => {
    return array.filter((value, index, self) => {
        return self.indexOf(value) === index;
    })
}