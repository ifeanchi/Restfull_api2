const {Sequelize, DataTypes, Model} = require('sequelize')
const {sequelize} = require('../db')
const bcrypt = require('bcrypt')


class User extends Model {}

class Item extends Model {}

User.init({
    name: DataTypes.STRING,
    email:DataTypes.STRING,
    password: DataTypes.STRING,
}, {
    sequelize,
    timestamps: false,
});

User.beforeCreate((user, options) => {
    return bcrypt.hash(user.password, 3)
     .then(hash =>{
         user.password = hash;
     })
     .catch(err => {
         throw new Error
     });
});

Item.init({
    name: DataTypes.STRING
}, {
    sequelize,
    timestamps: false,
});

module.exports = {User, Item};