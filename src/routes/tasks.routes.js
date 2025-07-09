const {Router} = require("express")
const routes = Router()

const TasksController = require("../controllers/tasksControllers")

routes.post("/", TasksController.create)
routes.get("/", TasksController.index)
routes.delete("/:id", TasksController.delete)
routes.get("/:id", TasksController.show)
routes.put("/:id", TasksController.update)

module.exports = routes