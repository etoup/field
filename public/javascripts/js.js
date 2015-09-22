$('dl.text-center').on('click',function(){
  var hasHover = $(this).hasClass('hover');
  if(hasHover){
    $(this).removeClass('hover');
  }else{
    $(this).addClass('hover');
  }
});