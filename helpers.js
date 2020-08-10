/* Remove forward slashes from URL */
function cleanURL(url) {
    return url.split('/', 2).pop();
}

module.exports = {cleanURL};