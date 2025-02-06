function getCurrentBritishFormatDate() {
    const date = new Date();
    const day = date.toLocaleString("en-GB", { day: "2-digit" });
    const month = date.toLocaleString("en-GB", { month: "long" });
    const year = date.getFullYear();

    return `${day} ${month},${year}`;
}

module.exports = {
    getCurrentBritishFormatDate
};
