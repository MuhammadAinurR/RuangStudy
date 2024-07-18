const dateFormat = (date) => {
    return date.toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
module.exports = dateFormat;