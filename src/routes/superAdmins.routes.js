const {Router} = require("express")


const superAdminsControllers = require("../controllers/superAdminControllers")




const superAdminRoutes = Router()


superAdminRoutes.post("/",superAdminsControllers.create)


module.exports = superAdminRoutes