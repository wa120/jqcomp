(function(comp){


  var isClick=false;
  $(comp).find("#Live").click(function(){
    isClick=!isClick;
    $.packages({pkg:"live",comp:"demo",param:isClick}).show();
  });

})($.package.CurrentComp);