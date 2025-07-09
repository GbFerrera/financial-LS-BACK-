const {Router} = require("express")


const UsersController = require("../controllers/usersControllers")



const usersRoutes = Router()


usersRoutes.post("/",UsersController.create)
usersRoutes.get("/", UsersController.index)
usersRoutes.delete("/:id",UsersController.delete)

module.exports = usersRoutes