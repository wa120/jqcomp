 (function(comp){

    $(comp).find("#Hello").click(function(){

      //call model1
      $(comp).model({action:"model1.php"},{
        success:function(options,funcs){
          $(comp).find("#test").empty().append(options.data);
        }
      });

    });

    $(comp).find("#World").click(function(){

      //call model2
      $(comp).model({action:"model2.php"},{
        success:function(options,funcs){
          $(comp).find("#test").empty().append(options.data);
        }
      });

    });

  })($.package.CurrentComp);