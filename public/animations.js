let hidden = document.querySelectorAll('.hidden');
var quotes = document.querySelectorAll('quote');

$(document).ready(() => {
    $(hidden).hide();

    $('.yes').click(function() {                                        //Cannot be arrow function for 'this' to work!
        var hiddenDiv = $(this).children(':first-child');
        $(hiddenDiv).slideDown(1000);
    });
})

/*
    - click on quote
        - id of div returned
    - child of div with class 'hidden' revealed

    or

    - click on quote
    - first child revealed
*/