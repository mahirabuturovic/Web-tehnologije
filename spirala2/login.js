function validiraj()
{
	var mojDiv=document.getElementById("greskice");
	var pass=document.getElementsByName("password")[0];
	var validacija = new Validacija(mojDiv);
	validacija.password(pass);
}