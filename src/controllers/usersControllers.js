
const knex = require("../database/knex")
const ErrorApp = require("../utils/ErrorApp")
const bcrypt = require("bcryptjs")


class UsersController {
    async create(req, res) {

        const { name, email, document , phone_number ,company_name } = req.body;

        if(!name || !email || !document || !phone_number || !company_name) {
            throw new ErrorApp("Todos os campos devem ser preenchidos", 401);
        }

        try {

            const userExists = await knex("users").where({ email }).first();

            if (userExists) {
                throw new ErrorApp("User ja cadastrado", 401);
            }

            // Use default password "12345"
            const defaultPassword = "12345"
            const passwordCrypt = bcrypt.hashSync(defaultPassword, 10)

            // Insert the user and get the ID of the inserted record
            const result = await knex("users").insert({
                name,
                email,
                password: passwordCrypt,
                document,
                phone_number,
                company_name
            }).returning('id')
            
            // Extract the ID value from the result
            const userId = result[0].id
            
            // Fetch the created user to return it
            const createdUser = await knex("users").where('id', userId).first()
            
            return res.status(201).json({
                user: createdUser,
                message: "User cadastrado com sucesso"
            })

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message || "Internal server error" })
        }

    }

    async index(req, res) {

        try {



            const users = await knex("users").select("*")
            
            return res.status(200).json(users)
            
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message || "Internal server error" })
        }




    }

    async delete(req,res){
        const {id} = req.params
        try {
            const userExists = await knex("users").where({id}).first()

            if(!userExists){
                throw new ErrorApp("User nao encontrado", 401)
            }

            await knex("users").where({id}).del()

            return res.status(200).json({message: "User deletado com sucesso"})
        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: error.message || "Internal server error" })
        }
    }
      
}


module.exports = new UsersController()
