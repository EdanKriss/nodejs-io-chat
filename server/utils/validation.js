module.exports.isRealString = (str) => {
    // returns true if str is non-empty str
    return typeof str === 'string' && str.trim().length > 0;
};