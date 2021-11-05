const {User} = require('../models');

const register = async(req, res) =>  {
    const {name, password} = req.body
    if(!name) return res.status(400).send("Name is required")
    if(!password || password.length < 6) 
    return res.status(400).send("Password is required and should be 6 characters long")
    let userExist = await User.findOne({where:{email: req.body.email}})
    if(userExist) return res.status(400).send("Email is taken")
    if(!userExist) return res.status(400).send("Email is required")

    let newUser = await User.create(req.body);
    res.json({newUser})
  }

  const showAllUsers = async (req, res) => {
    //what should i put here?
    let users = await User.findAll(req.body)
    res.json({users});
  }

  const showOneUser = async (req, res) => {
    let user = await User.findByPk(req.params.id);
    res.json({user});
  }

  const deleteOneUser = async (req, res) => {
    await User.destroy({where: {id: req.params.id}});
    res.send('Deleted!')
  }

  module.exports = {register, showAllUsers, showOneUser, deleteOneUser}





