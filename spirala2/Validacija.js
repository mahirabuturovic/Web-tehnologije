var Validacija=(function(){
//lokalne variable idu ovdje

var konstruktor=function(divElementPoruke){
	var poruka="Sljedeca polja nisu validna:";
return{
ime:function(inputElement){
		var x=inputElement.value;
		divElementPoruke.innerHTML="";
		divElementPoruke.style.color="yellow";
		inputElement.style.backgroundColor = 'white';
	    var rez=new RegExp('^([A-Z]{1}(\'?[a-z]+\'?[a-z]*)\[ \-]{1}[A-Z]{1}(\'?[a-z]+\'?[a-z]*))([ \-]{1}[A-Z]{1}(\'?[a-z]+\'?[a-z]*)){0,2}$');
		if(!rez.test(x))
		{
			if(poruka[poruka.length-1]!=":")	poruka+=poruka+",";
		    poruka=poruka+" ime";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
		}
		return true;

},
godina:function(inputElement){
	
	divElementPoruke.innerHTML="";
	inputElement.style.backgroundColor = 'white';
	divElementPoruke.style.color="yellow";
	var x=inputElement.value;
	var greska=0;
	var rez = new RegExp('^20[0-9]{2}[\/]20[0-9]{2}');
	if(!rez.test(x))	
		greska=1;
	
	if(greska==0){
	var prva=x.toString().substring(0,4);
    var druga=x.toString().substring(5,9);
    if((parseInt(prva)+1)!=parseInt(druga))	
		greska=1;	
	}
	
	if(greska==1){
		
		    if(poruka[poruka.length-1]!=":")	poruka=poruka+",";
		    poruka=poruka+" godina";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
		
	}
	
},
repozitorij:function(inputElement,regex){
	var x=inputElement.value;
	divElementPoruke.innerHTML="";
	divElementPoruke.style.color="yellow";
	inputElement.style.backgroundColor = 'white';
	if(!regex.test(x)) {
		    if(poruka[poruka.length-1]!=":")	poruka=poruka+",";
		    poruka=poruka+" repozitorij";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
	}
	return true;
},
index:function(inputElement){
	var x=inputElement.value;
	divElementPoruke.innerHTML="";
	divElementPoruke.style.color="yellow";
	inputElement.style.backgroundColor = 'white';
	
	var rez=new RegExp('^(1{1}[4-9]{1}|20{1})[0-9]{3}$');
	if(!rez.test(x)) {
		    if(poruka[poruka.length-1]!=":")	poruka=poruka+",";
		    poruka=poruka+"broj indexa";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
	}
	
	return true;
},
naziv:function(inputElement){
	
	var x=inputElement.value;
	divElementPoruke.innerHTML="";
	divElementPoruke.style.color="yellow";
	inputElement.style.backgroundColor = 'white';
	var rez=new RegExp('^([A-Z]|[a-z])[0-9A-Za-z\/-“‘!?:;,]*([0-9]|[a-z])$');
	
	if(!rez.test(x)) {
		    if(poruka[poruka.length-1]!=":")	poruka=poruka+",";
		    poruka=poruka+" naziv";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
	}

return true;
},
password:function(inputElement){
    var x=inputElement.value;
	divElementPoruke.innerHTML="";
	divElementPoruke.style.color="yellow";
	inputElement.style.backgroundColor = 'white';
	var rez=new RegExp('(((?=.*(\d){2})(?=.*([a-z]){2}))|((?=.*([a-z]){2})(?=.*([A-Z]{2})))|((?=.*(\d){2})(?=.*([A-Z]{2}))))[0-9a-zA-Z]{8,}$' );
	if(!rez.test(x)) {
		    if(poruka[poruka.length-1]!=":")	poruka=poruka+",";
		    poruka=poruka+" password";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
	}

	return true;
},
url:function(inputElement){

	var x=inputElement.value;
	divElementPoruke.innerHTML="";
	divElementPoruke.style.color="red";
	inputElement.style.backgroundColor = 'white';
	divElementPoruke.innerHTML="f";
/*OVAJ BACA IZUZETAK TREBA PROVJERIT  RegExp('^((http(s)?|ftp|ssh):\/\/){1}[a-zA-Z0-9]+([.]{1}[a-zA-Z0-9]+)*(\/{1}[A-Za-z0-9]+(([\/]{1}[A-Za-z0-9]+)*)\?{1}(([a-z0-9])+|([a-z0-9]+([-]{1})[a-z0-9]+))[=]{1}(([a-z0-9])+|([a-z0-9]+([-]{1})[a-z0-9]+))[&]{1}(([a-z0-9])+|([a-z0-9]+([-]{1})[a-z0-9]+))[=]{1}(([a-z0-9])+|([a-z0-9]+([-]{1})[a-z0-9]+)))?$');*/
	
var rez=new RegExp('^((http(s)?|ftp|ssh):\/\/){1}[a-zA-Z0-9]+([.][a-zA-Z0-9]+)*(\/{1}[A-Za-z0-9]+(\/{1}[a-zA-Z0-9]+)*[?]{1}(([a-z0-9]+)|([a-z0-9]+[-][a-z0-9]+))[=](([a-z0-9]+)|([a-z0-9]+[-][a-z0-9]+))[&](([a-z0-9]+)|([a-z0-9]+[-][a-z0-9]+))[=](([a-z0-9]+)|([a-z0-9]+[-][a-z0-9]+)))?$');
	
	if(!rez.test(x)) {
		    if(poruka[poruka.length-1]!=":")	poruka=poruka+",";
		    poruka=poruka+" url";
			divElementPoruke.innerHTML=poruka;
			inputElement.style.backgroundColor = 'orangered';
			return false;
	}

	return true;
	
}
}
}

return konstruktor;
}());
