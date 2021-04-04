
document.addEventListener("DOMContentLoaded", function (event) {
    console.log(`loaded at ${new Date()}`);
    handleCustomSearchOutput(document.querySelector('comment-box#first'));
    handleCustomSearchOutput(document.querySelector('comment-box#second'));
});

/**
* 	function to add listner for custom event `onSearchText` .
**/
function handleCustomSearchOutput(searchEle) {
    if (searchEle) {
        searchEle.addEventListener('onSearchText', function (event) {
            searchData(event.detail, searchEle);
        });
    }
}

/**
* 	output of textArea.
**/
function searchData(data, element = {}) {
    document.querySelector('#output').innerHTML = `${element.tagName}[${element.id}] > ${data}` ;
}