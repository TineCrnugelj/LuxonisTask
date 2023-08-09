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
                retry: {
                    match: [
                        Sequelize.ConnectionError,
                        Sequelize.ConnectionTimedOutError,
                        Sequelize.TimeoutError,
                        /Deadlock/i,
                        'SQLITE_BUSY'],
                    max: 5
                }
            },
            client: null
        }
    }
}