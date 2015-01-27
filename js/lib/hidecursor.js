var hideCursor = function(){
    if($('body').hasClass('cursor-hide')){
      $('body').removeClass('cursor-hide');
      $('#hidecursor').remove();
    } else {
      $('body').addClass('cursor-hide');
      $('head').append('<style id="hidecursor" type="text/css">*{cursor:none !important}</style>');
    }
}