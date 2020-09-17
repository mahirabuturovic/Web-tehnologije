
function validiraj()
{
	
	var mojDiv=document.getElementById("greske");
	var godina=document.getElementsByName("naziv")[0];
	var rvjezbe=document.getElementsByName("rvjezbe")[0];
	var rspirale=document.getElementsByName("rspiral")[0];
	var validacija = new Validacija(mojDiv);
	validacija.godina(godina);
	validacija.repozitorij(rvjezbe,new RegExp('^[a-z]$'));
	validacija.repozitorij(rspirale,new RegExp('^[a-z]$'));
}