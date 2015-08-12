jQuery.component
=================


To make this architecture by directory 

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

to initialize package of components

and catch the view and controller by asynchronous

     view        main.html  
     controller  main.js

this controller is js file and designed to closure in main.js

     (function(comp){
          
          ...
          
     })($.package.CurrentComp);


We can create model  

     $(comp).model({}) 

in the controller (main.js)

then call dynamic server page (php,jsp,aspx,nodejs etc) by asynchronous

Model pages were only processd CRUD(create, read, update, delete) action in jqcomp

--

http://jqcomp.org/

Team

     Wei-TaWang
     Ronnie Chang
     David Weng

wa114040@gmail.com
