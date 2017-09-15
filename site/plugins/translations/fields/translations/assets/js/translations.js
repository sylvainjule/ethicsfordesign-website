$(function(){

  $(document).on('click','.translations-delete',function (e) {
    $(this).next('.translations-delete-confirm').fadeIn();
    e.preventDefault();
    return false;
  });

  $(document).on('click','.translations-delete-cancel-btn',function (e) {
    $(this).parent('.translations-delete-confirm').fadeOut();
    e.preventDefault();
    return false;
  });

  $(document).on('click','.translations-update',function (e) {
    $(this).next('.translations-update-confirm').fadeIn();
    e.preventDefault();
    return false;
  });

  $(document).on('click','.translations-update-cancel-btn',function (e) {
    $(this).parent('.translations-update-confirm').fadeOut();
    e.preventDefault();
    return false;
  });
});