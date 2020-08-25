    $('.yes').click(function() {             
        $('.overlay').hide();
        var hiddenDiv = $(this).find('.overlay')                           //Cannot be arrow function for 'this' to work!
        if(!($(hiddenDiv).is(':visible'))) {
            $(hiddenDiv).fadeIn(200);
        } else {
            $(hiddenDiv).fadeOut(100);
        }
    })

$('html').click(function(e) {
    if(!($(e.target).parents('.yes').length) > 0 ) {
        $('.overlay').fadeOut(100);
    }
})

$('#modalEditQuote').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var body = button.data('body')
    var source = button.data('source')
    var id = button.data('id')
    var modal = $(this)
    modal.find('.input-body').val(body)
    modal.find('.input-source').val(source)
    modal.find('#submitQuoteId').val(id);
})

$('#modalDeleteQuote').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget)
    var id = button.data('id')
    var modal = $(this)
    modal.find('#deleteQuoteId').val(id);
})

// Add slideDown animation to Bootstrap dropdown when expanding.
$('.dropdown').on('show.bs.dropdown', function() {
$(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// Add slideUp animation to Bootstrap dropdown when collapsing.
$('.dropdown').on('hide.bs.dropdown', function() {
$(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});

// Add hover animation to quote cards
$('.yes').hover(function() {
    $(this).addClass('hover')
}, function () {
    $(this).removeClass('hover')
})

// Add hoveranimation to index cards
$('.index-card').hover(function() {
    $(this).addClass('hover')
}, function () {
    $(this).removeClass('hover')
})
