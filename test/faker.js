var faker = require('faker');
var mongodb = require('mongoose');
var Dare = require('../src/schemas/Dare').model;
var User = require('../src/schemas/User').model;

for (let i = 0; i < 5; i++) {
    User.create({
        username: faker.name.firstName(1).toLowerCase(),
        password: faker.random.alphaNumeric(10),
        rank: faker.random.number({
            min: 1,
            max: 5,
            precision: 1
        })
    }).then(user => {
        Dare.create({
            creator: user._id,
            participants: [user._id],
            amount: faker.random.number({
                min: 500,
                max: 10000,
                precision: 1
            }),
            timeFrame: faker.date.between(new Date(), '2019-01-05'),
            dare: faker.random.words(60)
        }, error => console.log("hey i just saved a user and a dare"));
    });
}