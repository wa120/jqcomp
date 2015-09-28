(function(comp){

  var other=$.packages({pkg:"live",comp:"other"}).show();

  $(comp).find("#Admin").click(function(){
    $(comp).hide();
      $.packages({pkg:"nav",comp:"admin"}).show();

  });

  $(comp).find("#Live").click(function(){
    other.hide();
    $.packages({pkg:"live",comp:"demo"}).show();
  });

})($.package.CurrentComp);