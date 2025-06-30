const {Router} = require("express")


const SessionsController = require("../controllers/sessionsControllers")

const sessionsController = new SessionsController()



const sessionRoutes = Router()


sessionRoutes.post("/",sessionsController.createSuperAdmin)


module.exports = sessionRoutes