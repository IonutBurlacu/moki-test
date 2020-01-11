export default number => {
    if (number > 1000000000) {
        return `${(number / 1000000000).toString()}B`;
    }
    if (number > 1000000) {
        return `${(number / 1000000).toString()}M`;
    }
    if (number > 1000) {
        return `${(number / 1000).toString()}K`;
    }
    return number.toString();
};
