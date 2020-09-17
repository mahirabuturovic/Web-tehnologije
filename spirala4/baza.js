const db = require('./db.js')
//const sequelize = new Sequelize("wt2018","root","root",{host:"127.0.0.1",dialect:"mysql"});
db.sequelize.sync({force:true}).then(function(){
 console.log("uspjesno dodano");
});
