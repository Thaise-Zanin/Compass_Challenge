const { Faker, pt_BR } = require('@faker-js/faker');
const fs = require('fs');
const faker = new Faker({ locale: [pt_BR] });

const quantidade = process.argv[2] || 5;

const movies = [];

for (let i = 0; i < quantidade; i++) {
    const filme = {
        title: faker.lorem.words(3),
        description: faker.lorem.sentence(),
        launchdate: faker.date.soon({ days: 60 }).toISOString(), 
        showtimes: [
            faker.date.soon({ days: 60 }).toISOString(),
            faker.date.soon({ days: 60 }).toISOString()
        ]
    };
    movies.push(filme);
}

fs.writeFileSync('data/dynamic/movies.json', JSON.stringify(movies, null, 2));

console.log("Arquivo movies.json gerado com sucesso!");

// node data/dynamic/generateMovies.js