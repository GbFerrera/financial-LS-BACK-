const {Router} = require("express")
const routesSessions = require("./sessions.routes")
const routes = Router()

routes.use("/sessions", routesSessions)

module.exports = routes
