(function(comp){

  var v=$(comp).find("#video1")[0];
  if(comp.param==true)
  {
    v.play();
  }
  else
  {
    v.pause();
  }
  

})($.package.CurrentComp);