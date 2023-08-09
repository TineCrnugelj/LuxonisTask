module.exports = {
    development: {
        postgres: {
            options: {
                host: 'postgres',
                port: 5432,
                database: 'postgres',
                dialect: 'postgres',
                username: 'postgres',
                password: 'admin',
                sync: true,
            },
            client: null
        }
    }
}