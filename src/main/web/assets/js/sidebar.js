//sidebar
$(".box").hover(function(e) {
	  document.getElementById("mySidenav").style.width = "260px";
	  document.getElementById("main").style.marginLeft = "260px";
	 // document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
	}, function(e) {
	  document.getElementById("mySidenav").style.width = "60px";
	  document.getElementById("main").style.marginLeft = "60px";
	 // document.body.style.backgroundColor = "white";
	});