$('dl.text-center').on('click',function(){
  var hasHover = $(this).hasClass('hover');
  if(hasHover){
    $(this).removeClass('hover');
  }else{
    $(this).addClass('hover');
  }
});
$('button.confirm').on('click',function(){
    var _id = $(this).attr('data'),
      _status=$(this).attr('status'),
      title=$(this).attr('swal-title'),
      text=$(this).attr('swal-text');
    swal({
      title: title,
      text: text,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#DD6B55",
      confirmButtonText: "确定",
      cancelButtonText: "关闭",
      closeOnConfirm: false
    },
    function(){
      
      $.ajax({
        type:'post',  
        url: "oc",
        data: {_id:_id,_status:_status},
        dataType: "json",
        success: function(data){
          if(data.msg =="true" ){ 
            swal({
              title: "操作成功!",
              type: "success"
            },
            function(){
              window.location.href = 'items';
            });
          }
        }
      });
    });
  })