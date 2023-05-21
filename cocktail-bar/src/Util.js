export function capitalize(str) {
    const words = str.toString().split(" ");
    const capitalizedWords = words.map((word) => {
        const lowerCaseWord = word.toLowerCase();
        return lowerCaseWord.charAt(0).toUpperCase() + lowerCaseWord.slice(1);
    });

    return capitalizedWords.join(" ");
}