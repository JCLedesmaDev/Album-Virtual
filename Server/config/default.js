
// Configuracion por defecto del proyecto 
module.exports = {
    // MONGODB_URI: ENV.MONGODB_URI,
    server: {
        port: 3005,
        public_url: 'http://localhost:',
    },
    mongoDb: {
        host: 'mognodb://localhost',
        port: 27017,
        name: '/test',
        password: 'X'
    },
    jwt_secret: 'HAS43efwsd@$^',
    logger: 'dev'
}