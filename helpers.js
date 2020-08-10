/* Remove forward slash from URL */
function cleanURL(url) {
    return url = url.replace('/', '');
}

module.exports = {cleanURL};