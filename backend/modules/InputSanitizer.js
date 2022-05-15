const { encode } = require("html-entities")
const sanitize = require("mongo-sanitize")

const encodeHtmlEntities = (string) => {
    // const sanitizedString = sanitize(string)
    const encodedString = encode(string)
    // const sanitizedString = encodedString.replace(/\$/gm, " &#36; ")
    const sanitizedString = encodedString.replace(/\$/gm, " &nbsp; ")
    return sanitizedString
}

module.exports = { encodeHtmlEntities }