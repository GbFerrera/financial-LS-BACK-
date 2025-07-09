const {Router} = require("express")
const routesSessions = require("./sessions.routes")
const routesAdmins = require("./admins.routes")
const routesSuperAdmins = require("./superAdmins.routes")
const routesProjects = require("./projects.routes")
const routesUsers = require("./users.routes")
const routesTasks = require("./tasks.routes")
const routes = Router()

routes.use("/sessions", routesSessions)
routes.use("/super-admin",routesSuperAdmins)
routes.use("/admins",routesAdmins)
routes.use("/users",routesUsers)
routes.use("/projects",routesProjects)
routes.use("/tasks",routesTasks)

module.exports = routes
