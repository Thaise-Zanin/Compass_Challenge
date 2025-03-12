import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import { BaseChecks, BaseRest, ENDPOINTS, testConfig } from '../../support/base/baseTest.js';
import { randomItem } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
    ...testConfig.options.smoke,
    thresholds: testConfig.thresholds
}

const base_uri = testConfig.environment.hml.cinema;
const baseRest = new BaseRest(base_uri);
const baseChecks = new BaseChecks();

export function handleSummary(data) {
    return {
        "FluxoCompleto.html": htmlReport(data),
    };
}

const dataMovies = new SharedArray('movies', function () {
    const jsonData = JSON.parse(open('../../data/dynamic/movies.json'));
    return jsonData;
});

const dataTickets = new SharedArray('tickets', function () {
    const jsonData = JSON.parse(open('../../data/dynamic/tickets.json'));
    return jsonData;
});


export default function () {
    let movie = randomItem(dataMovies);
    if (!movie) {
        console.error('Nenhum filme disponível para teste.');
        return;
    }

    console.log('Criando filme:', JSON.stringify(movie, null, 2));
    const urlRes = baseRest.post(ENDPOINTS.MOVIES_ENDPOINT, movie);
    baseChecks.checkStatusCode(urlRes, 201);
    baseChecks.checkResponseSize(urlRes, 5000);
    baseChecks.checkResponseTime(urlRes, 1000);
    baseChecks.checkResponseNotEmpty(urlRes);
    console.log('Filme criado com sucesso!');

    console.log('Listando filmes:');
    const urlGetRes = baseRest.get(ENDPOINTS.MOVIES_ENDPOINT);
    const limitedMovies = urlGetRes.json().slice(0, 5); 
    baseChecks.checkStatusCode(urlGetRes, 200);
    baseChecks.checkResponseNotEmpty(urlGetRes);

    if (limitedMovies.length === 0) {
        console.error('Nenhum filme disponível para listagem.');
        return;
    }

    console.log('Filmes listados:', JSON.stringify(limitedMovies, null, 2));

    let movieId = limitedMovies[0]._id;
    console.log(`Selecionando o filme com ID: ${movieId}`);

    let ticket = randomItem(dataTickets);
    if (!ticket) {
        console.error('Nenhum ticket disponível para criação.');
        return;
    }

    console.log('Criando ticket para o filme:', JSON.stringify(ticket, null, 2));
    const resPostTicket = baseRest.post(ENDPOINTS.TICKETS_ENDPOINT, ticket);
    baseChecks.checkStatusCode(resPostTicket, 201);
    baseChecks.checkResponseSize(resPostTicket, 5000);
    baseChecks.checkResponseTime(resPostTicket, 1000);
    baseChecks.checkResponseNotEmpty(resPostTicket);
    console.log('Ticket criado com sucesso!');

    console.log(`Excluindo o filme com ID: ${movieId}`);
    const deleteRes = baseRest.del(`${ENDPOINTS.MOVIES_ENDPOINT}/${movieId}`);
    baseChecks.checkStatusCode(deleteRes, 200);
    baseChecks.checkResponseNotEmpty(deleteRes);
    console.log('Filme excluído com sucesso!');

    sleep(2);
}
