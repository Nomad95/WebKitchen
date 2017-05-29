/*
	
	
	
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
window.func = function(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!
var yyyy = today.getFullYear()-16;
 if(dd<10){
        dd='0'+dd
    } 
    if(mm<10){
        mm='0'+mm
    } 

today = yyyy+'-'+mm+'-'+dd;
document.getElementById("datefield").setAttribute("max", today);
	
}*/