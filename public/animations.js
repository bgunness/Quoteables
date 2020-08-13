$(document).ready(() => {
    $('.overlay').hide();

    $('.yes').click(function() {                                        //Cannot be arrow function for 'this' to work!
        // $('.overlay').hide(500);
        // var offset = $(this).offset();
        // var hiddenDiv = $(this).children('.overlay');
        // $(hiddenDiv).css({'top':-50})
        // $(hiddenDiv).show(750);

        $('.overlay').hide(500);
        var offset = $(this).offset();
        var hiddenDiv = $(this).find('.overlay');
        // $(hiddenDiv).css({'top':-50})
        $(hiddenDiv).show(750);
    });
})

/*
    - position fixed
    - high z index
    - top/left/right/bottom coords match parent (class 'yes')
*/