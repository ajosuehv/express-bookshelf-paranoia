exports.seed = function (knex, Promise) {
    return knex('dummy_model').del()
        .then(function () {
            return knex('dummy_model').insert([
                {
                    firstname: 'Firstname1',
                    lastname: 'Last Name1',
                    genre: 'Female',
                    email: 'dummy1@dummymail.com',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    firstname: 'Firstname2',
                    lastname: 'Last Name2',
                    genre: 'Male',
                    email: 'dummy2@dummymail.com',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    firstname: 'Firstname3',
                    lastname: 'Last Name3',
                    genre: 'Female',
                    email: 'dummy3@dummymail.com',
                    active: false,
                    created_at: new Date(),
                    updated_at: new Date()
                },
                {
                    firstname: 'Firstname4',
                    lastname: 'Last Name4',
                    genre: 'Male',
                    email: 'dummy4@dummymail.com',
                    active: true,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            ]);
        });
};
