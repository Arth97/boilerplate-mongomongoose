require('dotenv').config();
const mongoose = require('mongoose');
const mongoUri = process.env['MONGO_URI']

//mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(mongoUri, { useNewUrlParser: true });

let Person;


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
Person = mongoose.model('Person', personSchema);


const createAndSavePerson = (done) => {
  let per1 = new Person({name: "Arth", age: 25, favoriteFoods: ["Algas", "Arroz"]})
  per1.save((err, data) => {
    if (err) return console.error("Error", err);
    done(null, data)
  });
};

var arrayOfPeople = [
  {name: "Frankie", age: 74, favoriteFoods: ["Del Taco"]},
  {name: "Sol", age: 76, favoriteFoods: ["roast chicken"]},
  {name: "Robert", age: 78, favoriteFoods: ["wine"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error("Error", err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function (err, docs) {
    if (err) return console.error("Error", err);
    done(null, docs)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function (err, docs) {
    if (err) return console.error("Error", err);
    done(null, docs)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function (err, docs) {
    if (err) return console.error("Error", err);
    done(null, docs)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function (err, docs) {
    if (err) return console.error("Error", err);
    console.log("dosc", docs)
    docs.favoriteFoods.push(foodToAdd)
    docs.save((err, data) => {
      if (err) return console.error("Error", err);
      done(null, data)
    });
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, { new: true }, function (err, docs) {
    if (err) return console.error("Error", err);
    done(null, docs)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function (err, data) {
    if (err) return console.error("Error", err);
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function (err, data) {
    if (err) return console.error("Error", err);
    done(null, data)
  })
};


var queryChain = function(done) {
const foodToSearch = 'burrito';
Person.find({favoriteFoods: foodToSearch})
      .sort({ name: 1 }) // -1 for descending
      .limit(2)
      .select({ age: 0 })
      .exec((err,data)=>{
        if(err) console.log(err);
        done(null, data);
      })
};


/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
