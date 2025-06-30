const {Router} = require("express")


const SessionsController = require("../controllers/sessionsControllers")

const sessionsController = new SessionsController()



const sessionRoutes = Router()


sessionRoutes.post("/",sessionsController.create)
sessionRoutes.post("/admin",sessionsController.createAdmin)
sessionRoutes.post("/super_admin",sessionsController.createSuperAdmin)


module.exports = sessionRoutes