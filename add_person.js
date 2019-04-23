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


  
let firstName = process.argv[2];
let lastName = process.argv[3];
let birthday = process.argv[4];

function addPerson (first_name, last_name, birthdate){
    knex('famous_people')
    .insert([{first_name, last_name,birthdate}])
    .then(() => console.log('data inserted'))
    .catch((err) => {console.log(err); throw err})
};

addPerson(firstName,lastName,birthday);