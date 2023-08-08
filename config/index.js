module.exports = {
    development: {
        postgres: {
            options: {
                host: 'localhost',
                port: 5432,
                database: 'dev',
                dialect: 'postgres',
                username: 'postgres',
                password: 'admin'
            },
            client: null
        }
    }
}