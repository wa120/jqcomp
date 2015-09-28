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
    $(comp).find("#User").click(function(){
          
          $.packages({pkg:"nav",comp:"user"}).find("#userNav").show();
          $(comp).find("#adminNav").hide();
    });
  })($.package.CurrentComp);