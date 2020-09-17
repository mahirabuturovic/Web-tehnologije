function validiraj()
{
	var mojDiv=document.getElementById("greskice");
	var naziv=document.getElementsByName("naziv")[0];
	var validacija = new Validacija(mojDiv);
	validacija.naziv(naziv);
}