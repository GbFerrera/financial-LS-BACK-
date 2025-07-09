const knex = require("../database/knex")
const ErrorApp = require("../utils/ErrorApp")


class TasksController {

    async create(req, res) {
        const { project_id, title, status, start_date, end_date, price, observations } = req.body;

        try {
            // Check if project exists
            const projectExists = await knex("projects").where({ id: project_id }).first();

            if (!projectExists) {
                throw new ErrorApp("Projeto não encontrado", 404);
            }

            // Insert the task and get the ID of the inserted record
            const result = await knex("tasks").insert({
                project_id,
                title,
                status,
                start_date,
                end_date,
                price,
                observations
            }).returning('id');
            
            // Extract the ID value from the result
            const taskId = result[0].id;
            
            // Fetch the created task to return it
            const createdTask = await knex("tasks").where('id', taskId).first();
            
            return res.status(201).json({
                task: createdTask,
                message: "Tarefa cadastrada com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { project_id, title, status, start_date, end_date, price, observations } = req.body;

        try {
            const taskExists = await knex("tasks").where({ id }).first();

            if (!taskExists) {
                throw new ErrorApp("Tarefa não encontrada", 404);
            }

            await knex("tasks").where({ id }).update({
                project_id,
                title,
                status,
                start_date,
                end_date,
                price,
                observations,
                updated_at: knex.fn.now()
            });

            const updatedTask = await knex("tasks").where({ id }).first();

            return res.status(200).json({
                task: updatedTask,
                message: "Tarefa atualizada com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        
        try {
            const taskExists = await knex("tasks").where({ id }).first();

            if (!taskExists) {
                throw new ErrorApp("Tarefa não encontrada", 404);
            }

            await knex("tasks").where({ id }).del();

            return res.status(200).json({ message: "Tarefa deletada com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        
        try {
            const task = await knex("tasks").where({ id }).first();

            if (!task) {
                throw new ErrorApp("Tarefa não encontrada", 404);
            }

            return res.status(200).json(task);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async index(req, res) {
        const { project_id } = req.query;
      
        try {
            const query = knex("tasks");
        
            if (project_id) {
                query.where({ project_id });
            }
        
            const tasks = await query;
        
            return res.status(200).json(tasks);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    } 
    
}


module.exports = new TasksController()