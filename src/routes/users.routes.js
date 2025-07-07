const {Router} = require("express")


const UsersController = require("../controllers/usersControllers")



const usersRoutes = Router()


usersRoutes.post("/",UsersController.create)
usersRoutes.get("/", UsersController.index)

module.exports = usersRoutes