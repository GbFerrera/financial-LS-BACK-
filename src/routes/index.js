const {Router} = require("express")
const routesSessions = require("./sessions.routes")
const routesAdmins = require("./admins.routes")
const routesSuperAdmins = require("./superAdmins.routes")
const routes = Router()

routes.use("/sessions", routesSessions)
routes.use("/super-admin",routesSuperAdmins)
routes.use("/admins",routesAdmins)

module.exports = routes
