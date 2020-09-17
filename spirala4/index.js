const express = require('express');
var jsonxml = require('jsontoxml');
var formidable=require('formidable');
var parse = require('csv-parse');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
var fs = require('fs');
const db = require('./db.js')
var multer= require("multer");
const baza=require('./baza.js');
var upload = multer();
var path = require('path');
const Sequelize = require("sequelize");
const connection = new Sequelize("wt2018","root","root",{host:"127.0.0.1",dialect:"mysql"});
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
    const targetPath = path.join(__dirname+'/zadaci/', req.body.naziv+'.pdf');
    console.log(tempPath);
    //const targetPath = path.join(__dirname, req.body.naziv+'.pdf');
    if (req.file.mimetype != "application/pdf") res.sendFile(__dirname+'/greska.html');
    else{
        db.zadatak.count({where:{naziv:req.body.naziv}}).
        then(count=>{
            if(count!=0)    res.sendFile(__dirname+'/greska.html');
            else{
                db.zadatak.create(
                    {
                        naziv:req.body.naziv,
                        postavka:req.body.naziv+'.pdf'
                    }
                )
            }
        })

        fs.readFile(tempPath, function (err, data) {
            if (err) throw err;
            fs.appendFile(targetPath, data, function (err) {
                if (err) throw err;                   
            });
        });

    }
});

//zadatak3
app.get('/zadatak', function (request, response) {

        db.zadatak.count({where:{postavka:(request.query.naziv)}}).
        then(count=>{
            if(count==0)    response.send("Greška");
            else{
                fs.readFile(__dirname+'/zadaci/'+request.query.naziv, function (err,data) {
                    if (err) {
                        throw err;
                    }
                    else {
                        response.contentType('application/pdf');
                        response.send(data);
                    }
                });
            }
        })
});
//zadatak4
app.post('/addGodina', function (req, res) {

    var tijelo = req.body;
    db.godina.count({where:{nazivGod:tijelo.naziv}})
    .then(count=>{
        if(count!=0) res.sendFile(__dirname+'/greska.html');
        else{
            db.godina.create(
                {
                    nazivGod:tijelo.naziv,
                    nazivRepSpi:tijelo.nazivRepSpi,
                    nazivRepVje:tijelo.nazivRepVje
                }
            )
        }

    });
})
//zadatak5
app.get('/godine', function (req, res) {
   
    db.godina.findAll({attributes: ['nazivGod','nazivRepSpi','nazivRepVje']}).then(function(data){
        res.json(data);
    });
});
//zadatak 7
app.get('/zadaci', function (req, res) {
    db.zadatak.findAll({attributes: ['naziv','postavka']}).then(function(data){
            var json=data;
            var csv = '';
            for (var i = 0; i < data.length; i++) {
                var line = '';
                line += data[i].naziv+','+data[i].postavka;
                csv += line + "\r\n";
                }
 
                var xml = "";
                for (var i = 0; i < data.length; i++) {
                    xml += jsonxml({
                        zadatak: {
                            naziv: " " + data[i].naziv + " ",
                            postavka: " " + data[i].postavka + " ",
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
app.get("/vjezba", function (req, res) {
    db.vjezba.findAll().then(
        result => {
            if(result.length==0)    res.send("Tabela je prazna");
            else
            res.send(result);
        }
    );
});
app.get("/godina", function (req, res) {
    db.godina.findAll().then(
        result => {
            if(result.length==0)    res.send("Tabela je prazna");
            else
            res.send(result);
        }
    );
});
app.get("/zadatak1", function (req, res) {
   //dodavanje vjezba-zadatak
    db.vjezba.findOne({
        where:{id:1}
    }).then(vjezbica=>{
        if(vjezbica.length!=0)  {    
         db.zadatak.findOne({
            where:{
                id:1
            }
    }).then(rezultat=>{
        vjezbica.addZadaci(rezultat);
        res.send();
    })
}
});
});
//dobavljanje zadataka koji nisu dodijeljeni vjezbi selektovanoj
app.get('/:idVjezbe/dobavi',function(req,res){
 
    var id_vjezbe=(req.params.idVjezbe);
    console.log(id_vjezbe);
    var dodijeljeni_id=[];
    var zadaci=[];
    db.vjezba.findOne({where:{id:id_vjezbe}}).then(function(nesto){
        if(nesto.length!=0){
        nesto.getZadaci().then(function(rez){
            rez.forEach(zadatak => {
                dodijeljeni_id.push(zadatak.id)
            });
            db.zadatak.findAll({where:{id:{$notIn:dodijeljeni_id}}})
            .then(function(result){
                if(result.length!=0){
                result.forEach(zadatak=>{
                    var obj={
                        "id":zadatak.id,
                        "naziv":zadatak.naziv
                    };
                    zadaci.push(obj)
                })
                    res.send(JSON.stringify(zadaci));
            }
            else res.send("Tabela ja prazna");
                
            })

        })
    }
    else res.send("Tabela je prazna");
    })


});

app.get('/vjezba1',function(req,res){
    
    var dodijeljeni_id=[];
    var zadaci=[];
    db.vjezba.findOne({where:{id:1}}).then(function(nesto){
     
        nesto.getZadaci().then(function(rez){
            rez.forEach(zadatak => {
                dodijeljeni_id.push(zadatak.id)
            });
            db.zadatak.findAll({where:{id:{$notIn:dodijeljeni_id}}})
            .then(function(result){
              
                result.forEach(zadatak=>{
                    var obj={
                        "id":zadatak.id,
                        "naziv":zadatak.naziv
                    };
                    zadaci.push(obj)
                })
                    res.send(JSON.stringify(zadaci));
            })

        })
    
    })


});

app.post('/vjezba/:idVjezbe/zadatak',function(req,res){

    var id_vjezbe=(req.params.idVjezbe);
    var zadatak_id=req.body.sZadatak;
    
  //dodavanje zadatka na vjezbu
   db.vjezba.findOne({
    where:{id:id_vjezbe}
    }).then(result=>{
    
    db.zadatak.findOne({
        where: {
            id: zadatak_id
        }
    }).then(rezultat=>{
        
        result.addZadaci(rezultat);
    })
   
    })

    res.redirect('http://localhost:8080/addVjezba.html');
   
})
app.post("/student",function(req,res){
    var broj=0;
    db.godina.findOne({
        where:{
            id:req.body.godina
        }
    }
) .then(godina=>{
    var studenti=req.body.studenti;
    
    db.student.count().then(
        brStudenata=>{
            for(var i=0;i<studenti.length;i++){
                var cekirano=provjeri(studenti[i],i);
                cekirano.then(student=>{
                    godina.addStudenti(student);
                }).catch(j=>{
                    db.student.create({
                        imePrezime:studenti[j].imePrezime,
                        index:studenti[j].index
                    }).then(noviStudent=>{
                        godina.addStudenti(noviStudent);
                    });
                })
                broj++;
            }
          
            res.set("Content-type","application/json");
            var brNovih=broj-brStudenata;
            res.status(200).send({"message":"Dodano je "+brNovih+" novih studenata i upisano "+broj+" na godinu "+godina.nazivGod});

        });
    });
});
function provjeri(student,i){
    var promise=new Promise(function(resolve,reject){
        db.student.findOne({
            where:{
                index:student.index
            }
        }).then(checked=>{
            if(checked==null) reject(i);
            else resolve(checked);
        });
    });
    return promise;
}

app.post('/addVjezba',function(req,res){

        //forma2
        if(req.body.hasOwnProperty("submit1")){
            console.log(req.body.sVjezbe+req.body.sGodine);
            db.godina.findOne({
                where:{id:req.body.sGodine}
            }).then(godinica=>{
                db.vjezba.findOne({
                    where:{
                        id:req.body.sVjezbe
                    }
            }).then(rezultat=>{
                godinica.addVjezbe(rezultat);
            })
        })
    }
    
        //forma1
        else if(req.body.hasOwnProperty("submit2")){
            var spirala;
            if(req.body.spirala=='on')   spirala=1;
            else spirala=0;
            db.vjezba.create({naziv:req.body.naziv,spirala:spirala}).
            then(vjezbica=>{
                db.godina.findOne({
                    where:{id:req.body.sGodine}
                }).then(result=>{
                    if(result.length!=0){
                    db.vjezba.findOne({
                        where: {
                            id: vjezbica.id
                        }
                    }).then(rezultat=>{
                        result.addVjezbe(rezultat);
                    })
                }
         
                })
            })
            
        }
        res.redirect('http://localhost:8080/addVjezba.html');
     

});

app.listen(8080);