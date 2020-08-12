
module.exports = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5000,
    mongoose: {
        url: process.env.MONGODB_CONNECTION_URL || "mongodb://127.0.0.1:27017/test",
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || '1244',
        accessExpirationMinutes: 60 * 10,
        options:{
            algorithm: 'RS256',
        },
    }
}