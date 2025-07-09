const {Router} = require("express")


const AdminsController = require("../controllers/adminsControllers")


const adminsRoutes = Router()


adminsRoutes.post("/",AdminsController.create)
adminsRoutes.get("/",AdminsController.index)
adminsRoutes.delete("/:id",AdminsController.delete)


module.exports = adminsRoutes