$(document).ready(() => {
    $('.overlay').hide();
    $('.yes').click(function() {                                        //Cannot be arrow function for 'this' to work!
        if(!($('.overlay').is(':visible'))) {
            var hiddenDiv = $(this).find('.overlay')
            $(hiddenDiv).show(200);
        } else {
            $('.overlay').hide(200);
        }
    })
});

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