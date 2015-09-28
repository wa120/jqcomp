 (function(comp){
    $(comp).find("#Hello").click(function(){
      alert("Hello");
    });
    $(comp).find("#World").click(function(){
      alert("World");
    });

  })($.package.CurrentComp);