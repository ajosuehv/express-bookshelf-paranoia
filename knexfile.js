module.exports = {
    test: {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            port : 1234,
            user : 'abc',
            password : 'password',
            database : 'abc_trips_server_test'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/test'
        }
    },
    development: {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            port : 1234,
            user : 'abc',
            password : 'password',
            database : 'abc_trips_server_development'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/development'
        }
    },
    production: {
        client: 'pg',
        connection: {
            host : '127.0.0.1',
            port : 1234,
            user : 'abc',
            password : 'password',
            database : 'abc_trips_server_production'
        },
        migrations: {
            directory: __dirname + '/db/migrations'
        },
        seeds: {
            directory: __dirname + '/db/seeds/production'
        }
    }
};