function pomozi(){
     var addVjezbaAjax=new XMLHttpRequest();
     addVjezbaAjax.onreadystatechange=function(){
        if (addVjezbaAjax.readyState == 4 && addVjezbaAjax.status == 200) {
            //ovdje bi trebalo da je niz godina iz baze
          
            var odg = JSON.parse(addVjezbaAjax.responseText);
            var sGodine = document.getElementsByName("sGodina")[0];
            for (var i = 0; i < odg.length; i++) {
              
                var opcija = document.createElement("option");
                opcija.value = odg[i].id;
                opcija.innerText = odg[i].nazivGod;
                sGodine.appendChild(opcija);       
            }
            
        }
     }
     addVjezbaAjax.open("GET", "http://localhost:8080/godina", true);
     addVjezbaAjax.send()
}

function ucitavanje(){
        
        
        alert('poslao');
        
        var bit=new BitBucket("","");
        
        var lista=bit.ucitaj("","","");
        var dodaj=document.getElementsByName("dodaj")[0];
        dodaj.disabled=false;
        dodaj.onclick=function(){
            var xhr=new XMLHttpRequest();
            xhr.onreadystatechange=function(){
                if(xhr.status==200 && xhr.readyState==4){
                    alert(JSON.parse(JSON.stringify(xhr.responseText)));
                }
            }
    
            var godina=document.getElementsByName('sGodina')[0].value;
            xhr.open("POST", "http://localhost:8080/student", true);
        
            xhr.setRequestHeader("Content-Type","application/json");
        
            xhr.send(JSON.stringify({
                "godina":godina,
                "studenti":lista
            }));
            
        
        };
 }
