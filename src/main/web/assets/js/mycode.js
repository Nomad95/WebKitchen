
	
	
	
window.func = function(){
	var tit;
	var old = document.getElementById('a').getAttribute("title");
	var element  = document.getElementById('in_a');	
	if(element!=null){
		tit = document.getElementById('in_a').value;	
	}
	else if(element.value==""){
		tit = old;
	}
	document.getElementById('a').setAttribute("title", tit);
}
	
