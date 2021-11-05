const path = require('path');
const fs = require('fs').promises;
// const bcrypt = require('bcrypt');

const {sequelize} = require('./db');
const {User, Item} = require('./models');

const createUsers = async () => {
    // let pw1 = await bcrypt.hash('1234', 2);
    // let pw2 = await bcrypt.hash('password', 2);
    // let pw3 = await bcrypt.hash('password', 2);

    const users = [
        {name : 'Dan', email:'dan.Sohval@gmail.com', password: '1234'},
        {name : 'Linda', email:'linda@gmail.com', password : 'password'},
        {name : 'Stanley', email:'stanley@gmail.com', password : 'enyinnaya'},
        {name : 'Crystal morris', email:'crystal@gmail.com', password : '233567'}
    ];

    return users
}


const items = [
    {name : 'Gold'},
    {name : 'Silver'},
    {name : 'Paladium'}
];


const seed = async () => {

    await sequelize.sync({ force: true });

    const users = await createUsers(); // create users w/ encrypted passwords

    const userPromises = users.map(user => User.create(user))
    const itemPromises = items.map(item => Item.create(item))
    await Promise.all([...userPromises, ...itemPromises]);
    console.log("db populated!")
}

seed();