const {Router} = require("express")
const routes = Router()

const ProjectsController = require("../controllers/projectsController")

routes.post("/", ProjectsController.create)
routes.get("/", ProjectsController.index)
routes.delete("/:id", ProjectsController.delete)
routes.get("/:id", ProjectsController.show)
routes.put("/:id", ProjectsController.update)

module.exports = routes