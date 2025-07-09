const knex = require("../database/knex")
const ErrorApp = require("../utils/ErrorApp")

class ProjectsController {
    async create(req, res) {
        const { user_id, title, description, status, start_date, end_date, price } = req.body;
        const admin_id = req.headers.admin_id

        try {
            const result = await knex("projects").insert({
                admin_id,
                user_id,
                title,
                description,
                status,
                start_date,
                end_date,
                price
            }).returning('id');
            
            const projectId = result[0].id;
            
            const createdProject = await knex("projects").where('id', projectId).first();
            
            return res.status(201).json({
                project: createdProject,
                message: "Projeto cadastrado com sucesso"
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async update(req, res) {
        const { id } = req.params;
        const { admin_id, user_id, title, description, status, start_date, end_date, price } = req.body;

        try {
            const projectExists = await knex("projects").where({ id }).first();

            if (!projectExists) {
                throw new ErrorApp("Projeto não encontrado", 404);
            }

            await knex("projects").where({ id }).update({
                admin_id,
                user_id,
                title,
                description,
                status,
                start_date,
                end_date,
                price,
                updated_at: knex.fn.now()
            });

            const updatedProject = await knex("projects").where({ id }).first();

            return res.status(200).json({
                project: updatedProject,
                message: "Projeto atualizado com sucesso"
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async delete(req, res) {
        const { id } = req.params;
        
        try {
            const projectExists = await knex("projects").where({ id }).first();

            if (!projectExists) {
                throw new ErrorApp("Projeto não encontrado", 404);
            }

            await knex("projects").where({ id }).del();

            return res.status(200).json({ message: "Projeto deletado com sucesso" });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async show(req, res) {
        const { id } = req.params;
        
        try {
            // Get project with user data
            const project = await knex("projects")
                .select([
                    "projects.*",
                    "users.name as user_name",
                    "users.email as user_email",
                    "users.phone_number as user_phone_number"
                ])
                .where("projects.id", id)
                .leftJoin("users", "projects.user_id", "users.id")
                .first();

            if (!project) {
                throw new ErrorApp("Projeto não encontrado", 404);
            }

            // Get tasks related to this project
            const tasks = await knex("tasks").where({ project_id: id });

            return res.status(200).json({
                ...project,
                tasks
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }

    async index(req, res) {
        const { admin_id, user_id } = req.query;
      
        try {
            // Build query with user data
            const query = knex("projects")
                .select([
                    "projects.*",
                    "users.name as user_name",
                    "users.email as user_email",
                    "users.phone_number as user_phone_number"
                ])
                .leftJoin("users", "projects.user_id", "users.id");
        
            if (admin_id) {
                query.where({ "projects.admin_id": admin_id });
            }

            if (user_id) {
                query.where({ "projects.user_id": user_id });
            }
        
            const projects = await query;
        
            return res.status(200).json(projects);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: error.message || "Internal server error" });
        }
    }
  
}

module.exports = new ProjectsController();