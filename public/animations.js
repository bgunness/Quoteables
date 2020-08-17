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

$('#exampleModalCenter').on('show.bs.modal', function (event) {
    console.log('hello');
    var button = $(event.relatedTarget)
    var body = button.data('body')
    var source = button.data('source')
    var modal = $(this)
    modal.find('.input-body').val(body)
    modal.find('.input-source').val(source)
    })