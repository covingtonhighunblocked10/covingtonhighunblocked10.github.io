$(document).ready(init)

function init() {
    carousel();
}

function carousel() {
    var images = $('#carousel').children('img').map(function () {
        return $(this).attr('src')
    }).get();
    while (i <= (Object.keys(images).length); i = 0; i++) {

    }
    images = Object.values(images);
    alert((images))
}