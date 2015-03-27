jquery-component
=================

New javascript MVC

Make the directory structure

packages/

└── pkg1/ \n
│   └─── comp1/
│   │   ├── main.html
│   │   ├── main.js
│   |   ├── model1.php
│   |   └── model2.php

We can use 

$.package({pkg:"pkg1",comp:"comp1"}); 

initialize component

and asynchronous get view main.html and controller main.js

the view is pure html

and the controller is closure by

(function(comp){
     ...
})($.package.CurrentComp);

style

we can use $(comp).model({}) in the main.js

asynchronous call dynamic server page likes php,jsp,aspx etc.

Model was only process CRUD(create, read, update, delete) action

http://jqcomp.org/

Wei-TaWang
Ronnie Chang
David Weng

wa114040@gmail.com
