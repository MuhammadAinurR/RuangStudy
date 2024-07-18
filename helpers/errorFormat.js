const errorFormat = (error) => {
    return error.errors.filter(e => e.message).map(e => e.message).join(', ')
}
module.exports = errorFormat;