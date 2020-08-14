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
    $('#exampleModalCenter').on('show.bs.modal', function (event) {
        console.log('hello');
        var button = $(event.relatedTarget) // Button that triggered the modal
        var body = button.data('asdf') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        // modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body p').text('running')
      })
});