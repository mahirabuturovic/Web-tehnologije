
function validiraj()
{
	
	var mojDiv=document.getElementById("greskice");
	var ime=document.getElementsByName("ime")[0];
	var index=document.getElementsByName("index")[0];
	var validacija = new Validacija(mojDiv);
	validacija.ime(ime);	
	validacija.index(index);	

}