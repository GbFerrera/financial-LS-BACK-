
const knex = require("../database/knex")
const ErrorApp = require("../utils/ErrorApp")
const bcrypt = require("bcryptjs")


class AdminsController {
    async create(req, res) {

        const { name, email, password, phone_number } = req.body;
        const super_admin_id = req.headers.super_admin_id



        try {

            const adminExists = await knex("admins").where({ email }).first();

            if (adminExists) {
                throw new ErrorApp("Admin ja cadastrado", 401);
            }

            // Insert the admin and get the ID of the inserted record
            const result = await knex("admins").insert({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                phone_number,
                super_admin_id
            }).returning('id')
            
            // Extract the ID value from the result
            const adminId = result[0].id
            
            // Fetch the created admin to return it
            const createdAdmin = await knex("admins").where('id', adminId).first()
            
            return res.status(201).json({
                admin: createdAdmin,
                message: "Admin cadastrado com sucesso"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message || "Internal server error" })
        }

    }

    async update(req, res) {

        const { id } = req.params;
        const { name, email, password, phone_number } = req.body;

        try {
            const adminExists = await knex("admins").where({ id }).first();

            if (!adminExists) {
                throw new ErrorApp("Admin nao encontrado", 401);
            }

            const admin = await knex("admins").where({ id }).update({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
                phone_number
            })

            return res.status(201).json(admin)
        } catch (error) {
            throw new ErrorApp(error.message, 401);
        }
    }

    async delete(req, res) {

    const { id } = req.params;
    
    try {
        const adminExists = await knex("admins").where({ id }).first();

        if (!adminExists) {
            throw new ErrorApp("Admin nao encontrado", 401);
        }

        await knex("admins").where({ id }).del();

        return res.status(201).json({message:"Admin deletado com sucesso"});
    } catch (error) {
        throw new ErrorApp(error.message, 401);
    }
    } 
    async index(req, res) {
        const { super_admin_id } = req.headers;
      
        try {
          const query = knex("admins");
      
          if (super_admin_id) {
            query.where({ super_admin_id });
          }
      
          const admins = await query;
      
          return res.status(200).json(admins);
        } catch (error) {
          throw new ErrorApp(error.message, 401);
        }
      }
      
}


module.exports = new AdminsController()
