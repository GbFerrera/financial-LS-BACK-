
const knex = require("../database/knex")
const ErrorApp = require("../utils/ErrorApp")
const bcrypt = require("bcryptjs")


class SuperAdminsController {
    async create(req, res) {

        const { name, email, password } = req.body;

        try {

            const superAdminExists = await knex("super_admins").where({ email }).first();

            if (superAdminExists) {
                throw new ErrorApp("Super Admin ja cadastrado", 401);
            }

            // Insert the super admin and get the ID of the inserted record
            const result = await knex("super_admins").insert({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            }).returning('id')
            
            // Extract the ID value from the result
            const superAdminId = result[0].id
            
            // Fetch the created super admin to return it
            const createdSuperAdmin = await knex("super_admins").where('id', superAdminId).first()
            
            return res.status(201).json({
                superAdmin: createdSuperAdmin,
                message: "Super Admin cadastrado com sucesso"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message || "Internal server error" })
        }

    }
      
}


module.exports = new SuperAdminsController()
