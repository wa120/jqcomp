jQuery.component
=================


To make directory by this architecture 

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

to initialize component and catch the view(main.html), controller(main.js) and model (xxx.xxx) by asynchronous

jquery MVC
=================

This works is clinet-side MVC architecture and Modularized Javascript by asynchronous

View wirtes width HTML DOM and can use anything server page language create.

Controller writes width closure in js file and loads by asynchronous

     (function(comp){
          
          ...
          
     })($.package.CurrentComp);


We can use 

     $(comp).model({}) 

in the controller to call dynamic server page (php,jsp,aspx,nodejs etc) works anything (likes sql command) by asynchronous

Model pages were processd CRUD(create, read, update, delete) in jqcomp

--

http://jqcomp.org/

Team

     Wei-TaWang
     Ronnie Chang
     David Weng

wa114040@gmail.com
