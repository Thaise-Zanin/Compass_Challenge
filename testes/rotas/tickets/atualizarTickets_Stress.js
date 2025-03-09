import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const base_uri = testConfig.environment.cinema.url;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export const options = testConfig.options.stress;

const data = new SharedArray('Tickets', function () {
    const jsonData = JSON.parse(open('../../../data/dynamic/tickets.json'));
    return jsonData;
});

if (data.length === 0) {
    throw new Error('A lista de tickets está vazia. Verifique o arquivo tickets.json.');
}

export function setup() {
    const urlRes = baseRest.get(ENDPOINTS.TICKETS_ENDPOINT);
    baseChecks.checkResponseNotEmpty(urlRes);

    const tickets = urlRes.json();
    if (tickets.length === 0) {
        throw new Error('Nenhum ticket encontrado para atualização');
    }

    const ticketId = tickets[0]._id; 
    console.log('Ticket ID para atualização:', ticketId);

    return { ticketId };
}

export default (data) => {
    let ticket = randomItem(data);
    console.log('Ticket selecionado para atualização:', ticket);

    if (!ticket || typeof ticket !== 'object') {
        throw new Error('Ticket selecionado é inválido ou está vazio');
    }

    ticket.seatNumber = ticket.seatNumber || 1; 
    ticket.price = ticket.price || 10; 
    ticket.showtime = ticket.showtime || new Date().toISOString();  

    ticket.seatNumber = Math.max(0, Math.min(99, ticket.seatNumber)); 
    ticket.price = Math.max(0, Math.min(60, ticket.price)); 

    console.log('Enviando requisição PUT para atualizar o ticket:', ticket);

    const urlRes = baseRest.put(ENDPOINTS.TICKETS_ENDPOINT + `/${data.ticketId}`, ticket);
    console.log('Status da resposta:', urlRes.status);
    console.log('Corpo da resposta:', urlRes.json());

    baseChecks.checkStatusCode(urlRes, 200);
    baseChecks.checkResponseNotEmpty(urlRes);

    sleep(1);
};
