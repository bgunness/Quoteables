let hidden = document.querySelectorAll('.hidden');

$(hidden).hide();

$('.quote').click(() => {
    console.log($(this));
    $(hidden).slideDown(1000);
});