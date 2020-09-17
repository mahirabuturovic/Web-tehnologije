const express = require('express');
var jsonxml = require('jsontoxml');
var parse = require('csv-parse');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
var fs = require('fs');
var multer= require("multer");
var upload = multer();
var path = require('path');
//zadatak 1
app.get('/studenti.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'studenti.html'));
});

app.get('/zadaci.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'zadaci.html'));
});
app.get('/addStudent.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'addStudent.html'));
});
app.get('/addGodina.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'addGodina.html'));
});
app.get('/addVjezba.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'addVjezba.html'));
});
app.get('/commiti.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'commiti.html'));
});
app.get('/login.html', function (req, res) {
    res.sendFile(path.join(__dirname, 'login.html'));
});
app.get('/addGodina', function (req, res) {
    res.sendFile(path.join(__dirname, 'addGodina.html'));
});
app.get('/addZadatak', function (req, res) {
    res.sendFile(path.join(__dirname, 'addZadatak.html'));
});
//
//zadatak 2

var multer  = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //cb(null, '/fajlovi/')
    cb(null, '/')
  },
  filename: function (req, file, cb) {
   // console.log(file.originalname);
    cb(null, file.originalname)
  }
})
 
var upload = multer({ storage: storage })

app.post('/addZadatak', upload.single('postavka'),(req, res) => {
const tempPath = req.file.path;
const targetPath = path.join(__dirname, req.body.naziv+'.pdf');

var ostalo = req.body;
if (req.file.mimetype != "application/pdf") res.sendFile(__dirname+'/greska.html');
else{
    fs.stat(__dirname + ostalo.naziv + ".pdf", function (err) {
        if (err) {
            //file ne postoji pa kreiramo json
            var obj = {
                "naziv": ostalo.naziv,
                "postavka": "http://localhost:8080/" + ostalo.naziv + ".pdf"
            };
            fs.appendFile(__dirname + "/zadacijson/" + ostalo.naziv + 'Zad'+".json", JSON.stringify(obj), function (err) {
                if (err) throw err;
            });
            fs.readFile(tempPath, function (err, data) {
                if (err) throw err;
                fs.appendFile(targetPath, data, function (err) {
                    if (err) throw err;
                    res.contentType('application/json');
                    res.sendFile(__dirname + "/zadacijson/" + ostalo.naziv +'Zad'+ ".json");                    
                });
            });
        }
        else {
            res.sendFile(__dirname + '/greska.html');
        }
    });
}
});
app.get('/:zadatak.pdf',function(req,res){
  fs.stat(__dirname+'/'+req.params.zadatak+'.pdf',function(err){
    if(err) res.send("Fajl nije pronadjen");
    else{
        fs.readFile(__dirname+'/'+req.params.zadatak+'.pdf', function (err,data) {
            if (err) {
                throw err;
            }
            else {
                res.download(data);
            }
        });
    }
  })

});

// zadatak 3
app.get('/zadatak', function (request, response) {

    fs.stat(__dirname+'/'+request.query.naziv+'.pdf',function(err){
        if(err) response.send("Fajl nije pronadjen!");
    else{
    fs.readFile(__dirname+'/'+request.query.naziv+'.pdf', function (err,data) {
        if (err) {
            throw err;
        }
        else {
            response.contentType('application/pdf');
            response.send(data);
        }
    });
}
});
});
// zadatak 4
app.post('/addGodina', function (req, res) {

    var tijelo = req.body;
    let postoji = 0;
    let naziv = [];
    
    var obj = { nazivGod: tijelo.nazivGod, nazivRepVje:tijelo.nazivRepVje, nazivRepSpi: tijelo.nazivRepSpi };
    var json=JSON.stringify(obj);

    var array = typeof json != 'object' ? JSON.parse(json) : json;
                var csv = '';
                var line = '';
                for (var index in array) {
                        if (line != '') line += ','
                        line += array[index];
                }    
                csv += line + "\r\n";
                
     fs.stat(__dirname+'/godine.csv',function(err){
      if(err)   throw err;
      else{
        fs.createReadStream('godine.csv')
        .pipe(parse({ delimiter: ':' }))
        .on('data', function (csvrow) {
            var data = csvrow[0].split(',');
            naziv.push(data[0]);
        })
        .on('end', function () {
            for (var i = 0; i < naziv.length; i++){
                if(naziv[i]==tijelo.nazivGod){
                    postoji=1;
                    break;
                }
            }
            if(postoji==1)  res.sendFile(__dirname+'/greska.html');
            else {
                fs.appendFile(__dirname+'/godine.csv',csv,function(err){
                    if(err) throw err;
                })
                res.sendFile(__dirname+'/addGodina.html');
            }
               
        });
}
});
});
//zadatak 5
app.get('/godine', function (req, res) {
    fs.stat(__dirname + "/godine.csv", function (err) {
        if (err) {
            res.send("ne postoji fajl godine.csv");
        }
        else {
            var naziv = [];
            var repo = [];
            var spir = [];
            var array = [];
            fs.createReadStream('godine.csv')
                .pipe(parse({ delimiter: ':' }))
                .on('data', function (csvrow) {
                    var data = csvrow[0].split(',');
                    naziv.push(data[0]);
                    repo.push(data[1]);
                    spir.push(data[2]);
                })
                .on('end', function () {
                    for (var i = 0; i < naziv.length; i++) {
                        json = {
                            "nazivGod": naziv[i],
                            'nazivRepVje': repo[i],
                            'nazivRepSpi': spir[i]
                        };
                        array.push(json);
                    }
                    res.setHeader('Content-type', 'application/json');
                    var a = JSON.stringify(array);
                    res.send(a);

                });
        }
    });
});
//zadatak 7
app.get('/zadaci', function (req, res) {
    fs.readdir(__dirname+'/zadacijson',function(err,files){
        var json=[];
        if(err) throw err;
        for(var i=0;i<files.length;i++){
            json.push(JSON.parse(fs.readFileSync(__dirname+'/zadacijson/'+files[i],'utf-8')));
        }
                var array = typeof json != 'object' ? JSON.parse(json) : json;
                var csv = '';
                for (var i = 0; i < array.length; i++) {
                    var line = '';
                    for (var index in array[i]) {
                        if (line != '') line += ','
                        line += array[i][index];
                    }
                    csv += line + "\r\n";
                }
                var xml = "";
                for (var i = 0; i < files.length; i++) {
                    xml += jsonxml({
                        zadatak: {
                            naziv: " " + json[i].naziv + " ",
                            postavka: " " + json[i].postavka + " ",
                        }
                    })
                }
                var XML = jsonxml(
                    {
                        zadaci: xml
                    }
                )
                var xml = '<?xml version="1.0" encoding="UTF-8"?>' + XML;
            
                var acceptsXML1 = req.accepts('application/xml');
                var acceptsXML2 = req.accepts('text/xml');
                var acceptsJSON = req.accepts('application/json');
                var acceptsCSV = req.accepts('text/csv');

                if(acceptsJSON){
                    res.set("Content-Type","application/json");
                    res.send(json);
                }
                else if(acceptsXML1){
                    res.set("Content-Type","application/xml");
                    res.send(xml);
                }
                else if(acceptsXML2){
                    res.set("Content-Type","text/xml");
                    res.send(xml);
                }

                else if (acceptsCSV) {
                    res.set("Content-Type","text/csv");
                    res.send(csv);
                }
              
                else {
                    res.send("Greska!");
                }
               
            });
});

app.listen(8080, function () {
    console.log("Prikaz stranice");
});