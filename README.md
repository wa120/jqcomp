jQuery.component
=================


To make the architecture of directory

     packages/
     └── pkg1/
     │   └── comp1/
     │    │   ├── main.html
     │    │   ├── main.js
     │    |   ├── model1.php
     │    |   └── ...

We can use

     $.package({pkg:"pkg1",comp:"comp1"}); 

and element

     <div id="pkg1" comp="comp1"></div>

to new the component and catch the view(main.html), controller(main.js) and model (xxx.xxx) by asynchronous

Single Page MVC
=================

This works is clinet-side MVC architecture and modularized javascript by asynchronous

View wirtes width HTML DOM and can use anything server page language create.

     <div>
          <span id="cc">dd</span>
          ....
     <div>

Controller writes width closure in js file and loads by asynchronous

     (function(comp){
          
          $(comp).find("cc").click(function(){
               alert("aa");
               var result=$(comp).model({action:"xxx.php",data:"aa=bb&cc=dd"});
               $(this).append(result);
          });
          ...
          
     })($.package.CurrentComp);


We can use 

     $(comp).model({action:"xxx.php",data:"aa=bb&cc=dd"}); 

in the controller to call dynamic server page (php,jsp,aspx,nodejs etc) works anything (likes sql command) by asynchronous

Model pages were processd CRUD(create, read, update, delete) in jqcomp

--

http://jqcomp.org/

Team

     Wei-TaWang
     Ronnie Chang
     David Weng

wa114040@gmail.com
