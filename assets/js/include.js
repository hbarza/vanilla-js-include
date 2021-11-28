/**
 * The main function that loop through a collection of all HTML elements with 
 * include attribute
 * 
 * @link https://www.w3schools.com/howto/howto_html_include.asp
 * @link https://www.w3schools.com/howto/tryit.asp?filename=tryhow_html_include_2
 */
function includeHTML() {
    const includeAttributeName = "include";
    const includes = document.querySelectorAll(`[${includeAttributeName}]`);

    for (const element of includes) {
        /* get the element attribute value */
        let filePath = element.getAttribute(includeAttributeName);
        if (!filePath) {
            continue;
        }

        getContent(element, filePath);
        element.removeAttribute(includeAttributeName);
    }
};

/**
 * Make an HTTP request using the attribute value as the file name
 * 
 * @param {Object} element HTML element has include attribute
 * @param {String} filePath Relative path of file to include from the project root directory
 */
function getContent(element, filePath) {
    const xHttp = new XMLHttpRequest();

    xHttp.onreadystatechange = function() {
        if (this.readyState != 4) {
            return;
        }

        if (this.status == 200) {
            element.innerHTML = this.responseText;
        }
        if (this.status == 404) {
            element.innerHTML = `<b style="color: red;">${filePath}</b> NOT FOUND`;
        }

        /* call main function once more */
        includeHTML();
    }

    xHttp.open("GET", filePath, true);
    xHttp.send();
}

includeHTML();
