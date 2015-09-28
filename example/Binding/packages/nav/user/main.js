 (function(comp){

    $(comp).find("#Hello").click(function(){

      //call model1
      $(comp).model({action:"model1.php"},{
        success:function(options,funcs){
          
          $(comp).find("#test").append(options.result);
        }
      });

    });

    $(comp).find("#World").click(function(){

      //call model2
      $(comp).model({action:"model2.php"},{
        success:function(options,funcs){
          
          $(comp).find("#test").append(options.result);
        }
      });

    });

    var a=$.packages({pkg:"pkg1",comp:"comp1"});
    var b=$.packages({pkg:"pkg2",comp:"comp1"});
    var c=$.packages({pkg:"pkg3",comp:"comp1"});
    var d=$.packages({pkg:"pkg4",comp:"comp1"});

    //binding it
    $.components({binding:"type",comps:[a,b,c,d]});

    //access
    $.each($.component.type,function(){
      $(this).show();
    });

  })($.package.CurrentComp);