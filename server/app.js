const express = require("express");
const fs = require ('fs')
const cors = require("cors");
const basicAuth = require('express-basic-auth');
const bcrypt = require('bcrypt');
require('dotenv').config();
// const router = require("./routes/auth")
const {Item} = require('./models');


// initialise Express
const app = express();


// initialise cors as middleware
app.use(cors())
// specify out request bodies are json
app.use(express.json());

// // basic auth needs a config object
// app.use(basicAuth({
//   authorizer : dbAuthorizer, //custom authorizer fn
//   authorizeAsync: true, //allow our authorizer to be async
//   unauthorizedResponse : () => 'You are not Authorized!'
// }))

// //compares username + password with what's in the database
// // Returns boolean indicating if password matches
// async function dbAuthorizer(username, password, callback){
//   try {
//     // get user from DB
//     const user = await User.findOne({where : {name : username}})
//     // isValid == true if user exists and passwords match, false if no user or passwords don't match
//     let isValid = (user != null) ? await bcrypt.compare(password, user.password) : false;
//     callback(null, isValid); //callback expects null as first argument
//   } catch(err) {
//     console.log("OH NO AN ERROR!", err)
//     callback(null, false);
//   }
// }

// all these routes are done read sync

// app.use("/", router)
// app.use("/users", router)
// app.use("/users/:id", router)
// app.use("/users/:id", router)

fs.readdirSync("./routes").map((r) => app.use("/", require(`./routes/${r}`)))

app.get('/', (req, res) => {
  res.send('Hello!!!!')
})

// app.get('/users', async (req, res) => {
//   //what should i put here?
//   let users = await User.findAll()
//   res.json({users});
// })

// app.get('/users/:id', async (req, res) => {
//   let user = await User.findByPk(req.params.id);
//   res.json({user});
// })

// app.delete('/users/:id', async (req, res) => {
//   await User.destroy({where: {id: req.params.id}});
//   res.send('Deleted!')
// })

// app.post('/register', async(req, res)=> {
//   let newUser = await User.create(req.body);
//   res.json({newUser})
// })

app.put('/users/:id', async(req, res)=> {
  let updatedUser = await User.update(req.body, {
    where : {id : req.params.id}
  });
  res.json({updatedUser})
})
// I want to get all items

app.get('/items', async(req, res)=> {
  let items = await Item.findAll();
  res.json({items});
})

// I want to get one item

app.get('/items/:id', async(req, res)=> {
  let item = await Item.findByPk(req.params.id);
  res.json({item});
})

// I want to delete one item

app.delete('/items/:id', async(req, res)=> {
  await Item.destroy({where: {id: req.params.id}});
  res.send('Deleted!')
})

// I want to create one item

app.post('/items', async(req, res)=> {
  let newItem = await Item.create(req.body);
  res.json({newItem})
})

// I want to update one item

app.put('/items/:id', async(req, res)=> {
  let updatedItem = await Item.update(req.body, {
    where : {id : req.params.id}
  });
  res.json({updatedItem})
})


const port = process.env.PORT || 8000
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});