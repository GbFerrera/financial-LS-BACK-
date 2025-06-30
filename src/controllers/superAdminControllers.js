
const knex = require("../database/knex")
const ErrorApp = require("../utils/ErrorApp")
const bcrypt = require("bcryptjs")


class AdminsController {
    async create(req, res) {

        const { name, email, password } = req.body;

        try {

            const adminExists = await knex("admins").where({ email }).first();

            if (adminExists) {
                throw new ErrorApp("Admin ja cadastrado", 401);
            }

            const admin = await knex("admins").insert({
                name,
                email,
                password: bcrypt.hashSync(password, 10),
            })

            return res.status(201).json(admin)

        } catch (error) {
            
        }

    }
      
}


module.exports = new AdminsController()
