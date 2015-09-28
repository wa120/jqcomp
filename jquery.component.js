/*******
The MIT License (MIT)

Copyright (c) 2015 Wei Ta Wang

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*****/
(function($){
  //ajax loading seqence
  //View >> Model >> Controller

  var DefaultPath="packages";
  var Driver="main";
  var ViewExt="html";

  $.packages=function(options,funcs)
  {
    if(typeof options=='undefined') options={};
	if(typeof funcs=='undefined') funcs={};
	if(typeof options.comps=='undefined') options.comps=[];
    if(typeof options.comp!='undefined')options.comps.push(options.comp);
    
	var pkgNode;
	var thisComp;
	if(typeof $.package[options.pkg]=='undefined') $.package[options.pkg]={};		
	
	if(typeof $.package[options.pkg][options.comp]=='undefined')
	{
		
		$.package.CurrentPkg=$("[id="+options.pkg+"]");
		var is_find=false;
		$.package["CurrentPkg"].each(function(){

    	  if($(this).attr("comp")==options.comp)
    	  {
    		$(this).component(options,funcs);       		  
    		is_find=true;
    		thisComp=$(this);
    		return ;
    	  }
    	 
      });
      if(is_find==false)
        alert("Element doesn't find \npkg: "+options.pkg+"."+options.comp);
      $.package[options.pkg][options.comp]=thisComp;
      return thisComp;
	}
	else	
	{
	  	
	  thisComp=$.package[options.pkg][options.comp];
	  if(typeof options.param!='undefined')
	    thisComp.component(options,funcs);
	  
	  return thisComp;
	}
	
    
  };
  $.package={_ViewMap:[],_ControllerMap:[],_ModelMap:[]};
  
  $.fn.package=function(options,funcs){};

  $.components=function(options,funcs){

  	if(typeof options=='undefined') options={};
	if(typeof funcs=='undefined') funcs={};

	if(typeof options.binding!='undefined' && typeof options.comps!='undefined')
	{
		$.component[options.binding]=options.comps;
	}
  };
  $.component={};
  
  $.fn.component=function(options,funcs)
  {
  		
  	var node=$(this);
    if(typeof options=='undefined') options={};
	if(typeof funcs=='undefined') funcs={};
	
    options._this=node;
	if(typeof options.pkg=='undefined') options.pkg=node.attr("id");
	if(typeof options.comp=='undefined') options.comp=node.attr("comp");
  
    if(typeof options.model=='undefined')
    {	
	  if(typeof options.view =='undefined')       options.view=node.attr("view");
	  if(typeof options.view =='undefined')       options.view=Driver+"."+ViewExt;
	  if(typeof options.controller =='undefined') options.controller=node.attr("controller");
	  options.model=node.attr("model");	  	  
	}

	if(typeof options.viewtype =='undefined') options.viewtype=node.attr("viewtype");

	if(typeof options.method =='undefined')   options.method=node.attr("method");
    if(typeof options.datatype =='undefined')   options.datatype="json";
	if(typeof options.data =='undefined')     options.data=node.attr("data");
	
	if(typeof options.cache =='undefined'&& typeof node.attr("cache")!='undefined')
	  options.cache=node.attr("cache").toLowerCase()=='true';
	
    _init(options,funcs);
	return node;
	
  };
  $.fn.model=function(options,funcs)
  {
  	var node=$(this);
    if(typeof options=='undefined') options={};
	if(typeof funcs=='undefined') funcs={};
	
    options._this=node;
	if(typeof options.pkg=='undefined') options.pkg=node.attr("id");
	if(typeof options.comp=='undefined') options.comp=node.attr("comp");
 
    if(typeof options.action=='undefined') 
    {
      alert("model hasn't action");
      return;
    }
    options.async=true;    
    if(typeof funcs.success=='undefined')
    {
    	options.async=false;
    }
    options.model=options.action;
    return loadingModel(options,funcs);
  }
  $.fn.view=function(options,funcs)
  {
  	var node=$(this);
    if(typeof options=='undefined') options={};
	if(typeof funcs=='undefined') funcs={};
	
    options._this=node;
	if(typeof options.pkg=='undefined') options.pkg=node.attr("id");
	if(typeof options.comp=='undefined') options.comp=node.attr("comp");

    if(typeof options.action=='undefined') 
    {
      alert("view hasn't action");
      return;
    }
    node.empty();
    options.view=options.action;
    loadingView(options,funcs);
    return node;
  }
  $.fn.controller=function(options,funcs)
  {
  	var node=$(this);
    if(typeof options=='undefined') options={};
	if(typeof funcs=='undefined') funcs={};
	
    options._this=node;
	if(typeof options.pkg=='undefined') options.pkg=node.attr("id");
	if(typeof options.comp=='undefined') options.comp=node.attr("comp");

    if(typeof options.action=='undefined') 
    {
      alert("controller hasn't action");
      return;
    }
    options.controller=options.action;
    loadingController(options,funcs);
    return node;
  }
  
  function _init(options,funcs)
  {
	if(typeof options.controller=='undefined' && typeof options.view!=='undefined')
	  options.controller=options.view.substring(0,options.view.lastIndexOf(".")+1)+"js";		
	
	if(typeof options.method =='undefined')   options.method="GET";
      
	options.cache =(typeof options.cache!='undefined')?options.cache:false;
    
	if(typeof options.view!='undefined')
	{

      if (typeof $.package._ViewMap[options.pkg+"/"+options.comp+"/"+options.view]=='undefined')
        loadingView(options,funcs);
      else
        loadingController(options,funcs);     
       
    }
    else
	{
	  if(typeof options.model!='undefined')
	  {
	    if(typeof options.controller!='undefined' && typeof funcs.success=='undefined')
	      funcs.loadingController=loadingController(options,funcs);
		  
		loadingModel(options,funcs);
	  }
	  else
	    loadingController(options,funcs);
	  
	}
  }
  function loadingView(options,funcs)
  {
  	var url=options.pkg+"/"+options.comp+"/"+options.view;
    $.ajax({
      async:true,
	  url:DefaultPath+"/"+url,
	  type:"GET",
	  cache:options.cache,
	  datatype:"html",
	  error:function(xhr, ajaxOptions, thrownError, request, error){
	    alert("View "+thrownError+".\npkg: "+options.pkg+"."+options.comp);
	  },
	  success:function(data){
	  	console.log(this); 
	  	
	    var node=$(data);			
	     (options.viewtype!="prepend")?node.appendTo(options._this):node.prependTo(options._this);

		 $.package._ViewMap[url]=true;
			
		if(typeof options.model!='undefined')
        {
		  if(typeof options.controller!='undefined' && typeof funcs.success=='undefined')
		    funcs.loadingController=function(){loadingController(options,funcs);}
			   
	      loadingModel(options,funcs);
				
		}
		else 
		  loadingController(options,funcs);
		
	  }
    });
  }
  function setFilters(options,funcs)
  {
    options._this.options=options;
	options._this.funcs=funcs;
	options._this.pkg=options.pkg;
	options._this.comp=options.comp;	      
	options._this.param=options.param;
	$.package.CurrentComp=options._this;
  }
  function loadingController(options,funcs)
  {
  	var url=options.pkg+"/"+options.comp+"/"+options.controller;
    if(typeof $.package._ControllerMap[url]=='undefined')
    {	
      
	  $.ajax({
	    url:DefaultPath+"/"+url,
	    cache:options.cache,
	    datatype:"script",
		error:function(xhr, ajaxOptions, thrownError, request, error){
			alert("Controller "+thrownError+".\npkg: "+options.pkg+"."+options.comp);
		},
		dataFilter:function(res){

	      setFilters(options,funcs);
		  return res;
		},
	    success:function(data){
		    console.log(this);
		    $.package._ControllerMap[url]=Function('options','funcs',data);
		}
	  });
    }
    else
    {
      setFilters(options,funcs);
      $.package._ControllerMap[url](options,funcs);
    }
  } 	
  function loadingModel(options,funcs)
  {

    var _loadingController=funcs.loadingController;
    var url=options.pkg+"/"+options.comp+"/"+options.model;  
	$.ajax({
	    async:options.async,
		url:DefaultPath+"/"+url,
		type:options.method,
		cache:false,
		datatype:options.datatype,
		data:options.data,
		error:function(xhr, ajaxOptions, thrownError, request, error){
		  console.log(this); 	
		  alert("Model "+options.model+" "+thrownError+".\npkg: "+options.pkg+"."+options.comp);
		},
		success:function(result,textStatus,jqXHR){
		  console.log(this);
		   
		  options.result=result;
		  options.textStatus=textStatus;
		  options.jqXHR=jqXHR;
		  options._this._success=funcs.success;

		  $.package._ModelMap[url]=true;
		  (typeof options._this._success=='function')?options._this._success(options,funcs):null;
		  (typeof _loadingController=='function')?_loadingController(options,funcs):null;
		}
	  });
	  return options.result;
  }

 })(jQuery);