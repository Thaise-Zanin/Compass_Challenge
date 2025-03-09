const { Faker, pt_BR } = require('@faker-js/faker');
const fs = require('fs');
const faker = new Faker({ locale: [pt_BR] });

const quantidade = process.argv[2] || 5;

const tickets = [];

for (let i = 0; i < quantidade; i++) {
    const ticket = {
        movieId: faker.string.uuid(),         
        userId: faker.string.uuid(),   
        seatNumber: faker.number.int({ min: 0, max: 99 }),  
        price: faker.number.int({ min: 0, max: 60 }), 
        showtime: faker.date.soon({ days: 60 }).toISOString() 
    };
    tickets.push(ticket);
}

const filePath = 'data/dynamic/tickets.json';

fs.writeFileSync(filePath, JSON.stringify(tickets, null, 2));

console.log("Arquivo tickets.json gerado com sucesso!");

// node data/dynamic/generateTickets.js