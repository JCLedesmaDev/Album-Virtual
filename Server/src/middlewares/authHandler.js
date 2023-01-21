const { usersCollection } = require("../models")
const { verifyToken } = require("../utils/jwt")
const { getProperties } = require('../utils/getProperties')


const authHandler = async (req, res, next) => {

    try {

        if (!req.headers.authorization) {
            // retornar error no token
            return res.status(401).send('no token')
        }

        const token = req.headers.authorization.split(' ').pop()
        const dataToken = await verifyToken(token)

        if (!dataToken) {
            return //eerror 
        }

        const query = {
            // Esto es xq en Sql tiene "id" y mongo "_id" enotnces lo hacemos dinamico  
            [getProperties().id]: dataToken[getProperties().id]
        }

        const user = await usersCollection.findById(query)
        req.user = user
        next()
    } catch (error) {
        // manejador de error
    }

}


module.exports = {
    authHandler
}