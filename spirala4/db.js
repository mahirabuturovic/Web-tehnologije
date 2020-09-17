const Sequelize = require("sequelize");
const sequelize = new Sequelize("wt2018","root","root",{host:"127.0.0.1",dialect:"mysql"});
const db={};

db.Sequelize = Sequelize;  
db.sequelize = sequelize;


//import modela
db.godina = sequelize.import(__dirname+'/godina.js');
db.student = sequelize.import(__dirname+'/student.js');
db.zadatak = sequelize.import(__dirname+'/zadatak.js');
db.vjezba = sequelize.import(__dirname+'/vjezba.js');

db.godina.hasMany(db.student,{as:'studenti',foreignKey:'studentGod'});
//relacije
//const GodinaVjezba=sequelize.define('godina_vjezba');
//godina vjezba n-m
db.godina_vjezba=db.vjezba.belongsToMany(db.godina,{as:'godine',through:'godina_vjezba',foreignKey:'idvjezba'});
db.godina.belongsToMany(db.vjezba,{as:'vjezbe',through:'godina_vjezba',foreignKey:'idgodina'});
//vjezba zadatak n-m
db.vjezbaZadatak=db.zadatak.belongsToMany(db.vjezba,{as:'vjezbe',through:'vjezba_zadatak',foreignKey:'idzadatak'});
db.vjezba.belongsToMany(db.zadatak,{as:'zadaci',through:'vjezba_zadatak',foreignKey:'idvjezba'});
//sequelize.sync();


module.exports=db;