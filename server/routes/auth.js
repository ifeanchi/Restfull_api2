const express = require("express");
const {register, showAllUsers, showOneUser, deleteOneUser} = require("../controllers/auth")

const router = express.Router();

router.post("/register", register)
router.get("/users", showAllUsers)
router.get("/users/:id", showOneUser)
router.delete("/users/:id", deleteOneUser)



module.exports = router
