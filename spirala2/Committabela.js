var CommitTabela = (function () {
    //lokalne variable idu ovdje
	var colspan;
	var tabelica;
	var old=0;
    var konstruktor = function (divElement, brojZadataka) {
	 colspan=3;
	 divElement.innerHTML ="";
	 tabelica = "<table id='tabelica'>";
		tabelica+="<tr>"+"<td>" + 'Zadaci' + "</td>";
		tabelica+='<td colspan="'+colspan.toString()+'">'+'Commiti'+'</td>';
		tabelica += "/<tr>";
		for(var i = 1; i <=brojZadataka; i++) {
			tabelica += "<tr>";
			tabelica+= "<td><a href='https://c2.etf.unsa.ba/mod/url/view.php?id=39779'>Zadatak " + i.toString() + ".</a></td>";
			tabelica += '<td colspan="'+colspan.toString()+'">'+'</td>';
			tabelica += "</tr>";
			}
        tabelica+="</table>";
		divElement.innerHTML = tabelica;

        return{
		dodajCommit:function(rbZadatka,url){
                  
				var kolone = document.getElementById("tabelica").columns;
				var celija=0;
				var slucaj1=1;
                var tabela = document.getElementById("tabelica");
		  		if(old==0)tabela.deleteRow(1);
		        var redovi = document.getElementById("tabelica").rows;
		                if (rbZadatka >= redovi.length) return -1;

				 for(var j=0;j<redovi[rbZadatka].cells.length;j++){
						 if (redovi[rbZadatka].cells[j].innerHTML != "") celija++;

					}

				
					if(celija==colspan)
					{	
			
							var a = document.createElement("a");
							a.setAttribute('href',url); 
							a.innerHTML =celija.toString();
							tabela.rows[rbZadatka].cells[celija].appendChild(a);
				    }
					
					 
					else if(celija<colspan){
					var x=tabela.rows[rbZadatka].insertCell(celija);
					x.innerHTML="<a href= '"+url+"'>"+(celija).toString();

					} 
		old++;
			  
		},
		editujCommit:function(rbZadatka,rbCommita,url){
	
			
		},
		obrisiCommit:function(rbZadatka,rbCommita){}
		}
	}
	
	
    return konstruktor;
}());