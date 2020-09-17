var tabela;
kreirajTabelu = function () {
    var divEl = document.getElementById("kreiranje");
    var brZad = parseInt(document.getElementById('brZadataka').value.toString());
    tabela = new CommitTabela(divEl, brZad);
}

dodaj = function (brZadatka,url) {

    var brZad = parseInt(brZadatka.value);
	var div = document.getElementById("greske");
    var validacija = new Validacija(div);
    if (validacija.url(url) == true) {
        tabela.dodajCommit(brZad, url.value);
    }
}


