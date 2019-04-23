const settings = require("./settings"); // settings.json

var knex = require('knex')({
    client: 'pg',
    connection: {
      host : settings.hostname,
      user : settings.user,
      password : settings.password,
      database : settings.database
    }
  });

  
let input = process.argv[2];



function lookUpByKnex(name) {
    knex.select('*').from('famous_people')
    .where('first_name',name)
    .orWhere('last_name',name) 
    .asCallback(function(err,rows){
        if (err) {
            return console.error("error running query", err);
          }
          console.log("Searching...");
          console.log(`Found ${rows.length} person(s) by the name '${name}':`);
          let count = 0;
          rows.forEach((row) => {
            console.log(`- ${count += 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().slice(0, 10)}'`);
          })
    })
  
}


lookUpByKnex(input);
// function lookUp(name) {
// if (err) {
//     return console.error("error running query", err);
//   }
//   console.log("Searching...");
//   console.log(`Found ${result.rows.length} person(s) by the name '${name}':`);
//   let count = 0;
//   result.rows.forEach((row) => {
//     console.log(`- ${count += 1}: ${row.first_name} ${row.last_name}, born '${row.birthdate.toISOString().slice(0, 10)}'`);
//   })
// }