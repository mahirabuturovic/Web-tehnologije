function Ucitaj_godine_i_vjezbu() {
   godina1(); vjezba1(); godina2(); vjezba2(); pomoc();
}
function pomoc(){
  
    var addZadatakAjax = new XMLHttpRequest();
    addZadatakAjax.onreadystatechange = function () {
        if (addZadatakAjax.readyState == 4 && addZadatakAjax.status == 200) {
           
            var odg = JSON.parse(addZadatakAjax.responseText);
            var sZadatak = document.getElementsByName("sZadatak")[0];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].naziv;
                sZadatak.appendChild(opcija);       
            }
            
        }
    }
    var a=1;
    var url = "http://localhost:8080/vjezba/" + a.toString()+"/zadatak";
    var forma = document.getElementsByName('fPoveziZadatak')[0];
    forma.action = url 
    addZadatakAjax.open("GET", "http://localhost:8080/vjezba1", true);
    addZadatakAjax.send();
}
function godina1(){
    var addGodineAjax = new XMLHttpRequest();
    addGodineAjax.onreadystatechange = function () {
        if (addGodineAjax.readyState == 4 && addGodineAjax.status == 200) {
            //ovdje bi trebalo da je niz godina iz baze
          
            var odg = JSON.parse(addGodineAjax.responseText);
            var sGodine = document.getElementsByName("sGodine")[0];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].nazivGod;
                sGodine.appendChild(opcija);       
            }
            
        }
    }
    addGodineAjax.open("GET", "http://localhost:8080/godina", true);
    addGodineAjax.send();
}

function vjezba1() {
    var addVjezbaAjax = new XMLHttpRequest();
    addVjezbaAjax.onreadystatechange = function () {
        //ajax se ne salje at all
        if (addVjezbaAjax.readyState == 4 && addVjezbaAjax.status == 200) {
            //ovdje bi trebalo da je niz godina iz baze
            
            var odg = JSON.parse(addVjezbaAjax.responseText);
            var sVjezbe = document.getElementsByName("sVjezbe")[0];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].naziv;
                sVjezbe.appendChild(opcija);       
            }
            
        }
    }
    addVjezbaAjax.open("GET", "http://localhost:8080/vjezba", true);
    addVjezbaAjax.send();
}
function godina2(){
    var addGodineAjax = new XMLHttpRequest();
    addGodineAjax.onreadystatechange = function () {
  
        if (addGodineAjax.readyState == 4 && addGodineAjax.status == 200) {
        
            var odg = JSON.parse(addGodineAjax.responseText);
            var sGodine = document.getElementsByName("sGodine")[1];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].nazivGod;
                sGodine.appendChild(opcija);       
            }
            
        }
    }
    addGodineAjax.open("GET", "http://localhost:8080/godina", true);
    addGodineAjax.send();
}

function zadaci(){
    var addZadatakAjax = new XMLHttpRequest();
    addZadatakAjax.onreadystatechange = function () {
       
        if (addZadatakAjax.readyState == 4 && addZadatakAjax.status == 200) {
           
            var odg = JSON.parse(addZadatakAjax.responseText);
            var sZadatak = document.getElementsByName("sZadatak")[0];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].naziv;
                sZadatak.appendChild(opcija);       
            }
            
        }
    }
    addZadatakAjax.open("GET", "http://localhost:8080/zadatak1", true);
    addZadatakAjax.send();
}
function vjezba2() {
    var addVjezbaAjax = new XMLHttpRequest();
    addVjezbaAjax.onreadystatechange = function () {
       
        if (addVjezbaAjax.readyState == 4 && addVjezbaAjax.status == 200) {
    
            var odg = JSON.parse(addVjezbaAjax.responseText);
            var sVjezbe = document.getElementsByName("sVjezbe")[1];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].naziv;
                sVjezbe.appendChild(opcija);       
            }
            
        }
    }
    addVjezbaAjax.open("GET", "http://localhost:8080/vjezba", true);
    addVjezbaAjax.send();
}

function dodajZadatak(){
    var zadatakAjax = new XMLHttpRequest();
    zadatakAjax.onreadystatechange = function () {
        if (zadatakAjax.readyState == 4 && zadatakAjax.status == 200) {
          
            var odg = JSON.parse(zadatakAjax.responseText);
            var sZadatak = document.getElementsByName("sZadatak")[0];
            for (var i = 0; i < odg.length; i++) {
             
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].naziv;
                sZadatak.appendChild(opcija);       
            }
        }
    }
    zadatakAjax.open("GET", "http://localhost:8080/zadacic", true);
    zadatakAjax.send();
}


function promijeniVjezbu(){
    var zadatakAjax = new XMLHttpRequest();
    alert("jee");
    zadatakAjax.onreadystatechange = function () {

        if (zadatakAjax.readyState == 4 && zadatakAjax.status == 200) {
            var odg = JSON.parse(zadatakAjax.responseText);
            var sZadatak = document.getElementsByName("sZadatak")[0];
            sZadatak.options.length=0;
            
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].naziv;
                sZadatak.appendChild(opcija);       
            }
        }
    }
    var idVjezbe=(document.getElementsByName("sVjezbe")[1]).value;
    var url = "http://localhost:8080/vjezba/" + idVjezbe.toString()+"/zadatak";
    var forma = document.getElementsByName('fPoveziZadatak')[0];
    forma.action = url ;
    var url="http://localhost:8080/"+idVjezbe.toString()+"/dobavi";
    zadatakAjax.open("GET",url, true)
    zadatakAjax.send();
}



window.onload = Ucitaj_godine_i_vjezbu; // no parenthesis after function name